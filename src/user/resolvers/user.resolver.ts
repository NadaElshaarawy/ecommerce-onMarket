import { Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { SecurityGroup } from 'src/security-group/security-group.model';
import { GqlBooleanResponse } from 'src/_common/graphql/graphql-response';
import { Timestamp } from 'src/_common/graphql/timestamp.scalar';
import { User } from '../models/user.model';
import { UserDataloader } from '../user.dataloader';
import { UserService } from '../user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly userDataloader: UserDataloader
  ) {}

  //** --------------------- QUERIES --------------------- */

  //** --------------------- MUTATIONS --------------------- */
  @Mutation(returns => GqlBooleanResponse)
  async seedAdmin() {
    return await this.userService.seedAdmin();
  }

  //** ------------------- DATALOADER ------------------- */
  @ResolveField(type => SecurityGroup, { nullable: true })
  securityGroup(user: User) {
    if (!user.securityGroupId) return null;
    return this.userDataloader.securityGroupLoader.load(user.securityGroupId);
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
