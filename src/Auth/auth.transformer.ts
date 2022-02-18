import { Inject, Injectable } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { HelperService } from 'src/_common/utils/helper.service';
import { GqlContext } from 'src/_common/graphql/graphql-context.type';
import { SignUpInput } from './inputs/sign-up.input';

@Injectable()
export class AuthTransformer {
  constructor(
    private readonly helperService: HelperService,
    @Inject(CONTEXT) private readonly context: GqlContext
  ) {}
  async signUpInputTransformer(input: SignUpInput) {
    return {
      ...input,
      favLang: this.context.lang,
      fullName: input.firstName + ' ' + input.lastName,
      notVerifiedPhone: input.phone,
      password: await this.helperService.hashPassword(input.password),
      slug: this.helperService.slugify(`${input.firstName} - ${input.lastName || ''}`)
    };
  }
}
