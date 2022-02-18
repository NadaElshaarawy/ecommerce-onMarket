import { Query, Resolver } from '@nestjs/graphql';
import { User } from '../models/user.model';

@Resolver(() => User)
export class UserResolver {
  constructor() {}

  //** --------------------- QUERIES --------------------- */
  @Query(returns => Boolean)
  async me() {
    return true;
  }
  //** --------------------- MUTATIONS --------------------- */

  //** ------------------ RESOLVE FIELDS ------------------ */
}
