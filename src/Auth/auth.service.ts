import { HttpException, Injectable } from '@nestjs/common';
import { isISO31661Alpha2 } from 'class-validator';
import { Request } from 'express';
import { User } from 'src/user/models/user.model';
import { LangEnum } from 'src/user/user.type';
import { TokenPayload } from './auth.token-payload.type';
import { AuthTransformer } from './auth.transformer';
import { SignUpInput } from './inputs/sign-up.input';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

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
    if (req?.headers?.Authorization) {
      let auth: string = <string>req.headers.Authorization;
      return auth.split(' ')[1];
    }
    return null;
  }

  async getUserFromReqHeaders(req: Request): Promise<User> {
    let token = this.getAuthToken(req);
    if (!token) return null;
    let { userId } = <TokenPayload>jwt.verify(token, this.config.get('JWT_SECRET'));
    const user = await User.findOne({ where: { id: userId } });
    return user;
  }

  private async errorIfUserWithVerifiedPhoneExists(phone: string) {
    if (await User.findOne({ where: { verifiedPhone: phone } }))
      throw new HttpException('phone already exists', 610);
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
      throw new HttpException('email already exist', 611);
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
    const user = await User.create({ ...transformedInput });
    return this.appendAuthTokenToUser(user);
  }
}
