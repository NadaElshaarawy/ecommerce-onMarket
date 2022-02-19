import { Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Timestamp } from 'src/_common/graphql/timestamp.scalar';
import { User } from '../models/user.model';
import { UserService } from '../user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  //** --------------------- QUERIES --------------------- */

  //** --------------------- MUTATIONS --------------------- */
  @Mutation(returns => Boolean)
  async seedAdmin() {
    return await this.userService.seedAdmin();
  }
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
