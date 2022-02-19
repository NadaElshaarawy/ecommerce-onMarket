import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Timestamp } from 'src/_common/graphql/timestamp.scalar';
import { User } from '../models/user.model';

@Resolver(() => User)
export class UserResolver {
  constructor() {}

  //** --------------------- QUERIES --------------------- */
  @Query(returns => Timestamp)
  async me() {
    const users = await User.paginate();
    console.log(users);

    return new Date().getTime();
  }
  //** --------------------- MUTATIONS --------------------- */

  //** ------------------ RESOLVE FIELDS ------------------ */

  @ResolveField(type => Timestamp)
  createdAt(@Parent() securityGroup) {
    return new Date(securityGroup.createdAt).valueOf();
  }

  @ResolveField(type => Timestamp)
  updatedAt(@Parent() securityGroup) {
    return new Date(securityGroup.updatedAt).valueOf();
  }
}
