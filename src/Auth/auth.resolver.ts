import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from 'src/user/models/user.model';
import { AuthService } from './auth.service';
import { SignUpInput } from './inputs/sign-up.input';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  //** --------------------- QUERIES --------------------- */

  //** --------------------- MUTATIONS --------------------- */
  @Mutation(returns => User)
  async signUp(@Args('input') input: SignUpInput) {
    return await this.authService.signup(input);
  }
}
