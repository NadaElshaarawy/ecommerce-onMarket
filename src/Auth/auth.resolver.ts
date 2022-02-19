import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from 'src/user/models/user.model';
import { AuthService } from './auth.service';
import { LoginInput } from './inputs/login.input';
import { SignUpInput } from './inputs/sign-up.input';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  //** --------------------- QUERIES --------------------- */

  //** --------------------- MUTATIONS --------------------- */
  @Mutation(returns => User)
  async signup(@Args('input') input: SignUpInput) {
    return await this.authService.signup(input);
  }

  @Mutation(returns => User)
  async login(@Args('input') input: LoginInput) {
    return await this.authService.login(input);
  }
}
