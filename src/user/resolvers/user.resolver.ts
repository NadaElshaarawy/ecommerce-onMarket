import { Query, Resolver } from '@nestjs/graphql';
import { Timestamp } from 'src/_common/graphql/timestamp.scalar';
import { User } from '../models/user.model';

@Resolver(() => User)
export class UserResolver {
  constructor() {}

  //** --------------------- QUERIES --------------------- */
  @Query(returns => Timestamp)
  async me() {
    return new Date().getTime();
  }
  //** --------------------- MUTATIONS --------------------- */

  //** ------------------ RESOLVE FIELDS ------------------ */
}
