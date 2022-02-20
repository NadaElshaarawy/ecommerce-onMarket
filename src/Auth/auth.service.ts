import { Injectable } from '@nestjs/common';
import { isISO31661Alpha2 } from 'class-validator';
import { Request } from 'express';
import { User } from 'src/user/models/user.model';
import { LangEnum } from 'src/user/user.type';
import { TokenPayload } from './auth.token-payload.type';
import { AuthTransformer } from './auth.transformer';
import { SignUpInput } from './inputs/sign-up.input';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { LoginInput } from './inputs/login.input';
import { WhereOptions } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import { SecurityGroup } from 'src/security-group/security-group.model';
import { BaseHttpException } from 'src/_common/exceptions/base-http-exception';
import { ErrorCodeEnum } from 'src/_common/exceptions/error-code.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly authTransformer: AuthTransformer
  ) {}

  getLocale(req: Request): { lang: LangEnum; country: string } {
    if (!req) return { lang: LangEnum.EN, country: 'EG' };
    let locale = <string>req.headers.lang || 'eg-en';
    let country = locale.split('-')[0].toUpperCase();
    if (!country || !isISO31661Alpha2(country)) country = 'EG';
    let lang = locale.split('-')[1] === 'ar' ? LangEnum.AR : LangEnum.EN;
    return { lang, country };
  }

  getAuthToken(req: Request): string {
    if (req?.headers?.authorization) {
      let auth: string = <string>req.headers.authorization;
      return auth.split(' ')[1];
    }
    return null;
  }

  async getUserFromReqHeaders(req: Request): Promise<User> {
    let token = this.getAuthToken(req);
    if (!token) return null;
    let { userId } = <TokenPayload>jwt.verify(token, this.config.get('JWT_SECRET'));
    const user = await User.findOne({ where: { id: userId }, include: [SecurityGroup] });
    return user;
  }

  private async errorIfUserWithVerifiedPhoneExists(phone: string) {
    const user = await User.findOne({ where: { verifiedPhone: phone } });
    if (user) throw new BaseHttpException(ErrorCodeEnum.PHONE_ALREADY_EXISTS);
  }

  private async deleteDuplicatedUsersAtNotVerifiedPhone(duplicatedPhone: string) {
    await User.destroy({ where: { notVerifiedPhone: duplicatedPhone } });
  }

  private async deleteDuplicatedUsersAtEmailsIfPhoneNotVerifiedYet(duplicatedEmail?: string) {
    if (duplicatedEmail) {
      const user = await User.findOne({ where: { email: duplicatedEmail } });
      if (user && !user.verifiedPhone) await user.destroy({ force: true });
    }
  }

  async errorIfUserWithEmailExists(email?: string) {
    if (email && (await User.findOne({ where: { email } })))
      throw new BaseHttpException(ErrorCodeEnum.EMAIL_ALREADY_EXISTS);
  }

  generateAuthToken(id: string): string {
    return jwt.sign({ userId: id }, this.config.get('JWT_SECRET'));
  }

  appendAuthTokenToUser(user: User) {
    return Object.assign(user, { token: this.generateAuthToken(user.id) });
  }

  async signup(input: SignUpInput) {
    await this.errorIfUserWithVerifiedPhoneExists(input.phone);
    await this.deleteDuplicatedUsersAtNotVerifiedPhone(input.phone);
    await this.deleteDuplicatedUsersAtEmailsIfPhoneNotVerifiedYet(input.email);
    await this.errorIfUserWithEmailExists(input.email);
    const transformedInput = await this.authTransformer.signUpInputTransformer(input);
    // TODO : don't save on verified phone after make phone verification
    const user = await User.create({ ...transformedInput, verifiedPhone: input.phone });
    return this.appendAuthTokenToUser(user);
  }

  async getValidUserForLoginOrError(where: WhereOptions): Promise<User> {
    const user = await User.findOne({ where });
    if (!user) throw new BaseHttpException(ErrorCodeEnum.INVALID_CREDENTIALS);
    if (user.isBlocked) throw new BaseHttpException(ErrorCodeEnum.BLOCKED_USER);
    return user;
  }

  async matchPassword(password: string, hash: string) {
    const isMatched = await bcrypt.compare(password, hash);
    if (!isMatched) throw new BaseHttpException(ErrorCodeEnum.INVALID_CREDENTIALS);
  }

  async login(input: LoginInput): Promise<User> {
    const params = { verifiedPhone: input.phone };
    const user = await this.getValidUserForLoginOrError(params);
    await this.matchPassword(input.password, user.password);
    return this.appendAuthTokenToUser(user);
  }
}
