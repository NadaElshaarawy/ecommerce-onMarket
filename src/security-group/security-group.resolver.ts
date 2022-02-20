import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/Auth/auth.guard';
import { HasPermission } from 'src/Auth/auth.metadata';
import { Timestamp } from 'src/_common/graphql/timestamp.scalar';
import { CreateSecurityGroupInput } from './inputs/create-security-group.input';
import { SecurityGroupInput } from './inputs/security-group.input';
import { getAllPermissions, SecurityGroupPermissionsEnum } from './security-group-permissions';
import { SecurityGroup } from './security-group.model';
import { securityGroupResponse, securityGroupsArrayResponse } from './security-group.response';
import { SecurityGroupService } from './security-group.service';
@UseGuards(AuthGuard)
@Resolver(of => SecurityGroup)
export class SecurityGroupResolver {
  constructor(private readonly securityGroupService: SecurityGroupService) {}

  //** --------------------- QUERIES --------------------- */

  @Query(returns => securityGroupsArrayResponse)
  async securityGroups() {
    return await this.securityGroupService.securityGroups();
  }

  @Query(returns => securityGroupResponse)
  async securityGroup(@Args() input: SecurityGroupInput) {
    return await this.securityGroupService.securityGroupOrError(input.securityGroupId);
  }

  @Query(returns => securityGroupsArrayResponse)
  async getAllPermissions() {
    return getAllPermissions();
  }

  //** --------------------- MUTATIONS --------------------- */
  @HasPermission(SecurityGroupPermissionsEnum.CREATE_SECURITY_GROUPS)
  @Mutation(returns => securityGroupResponse)
  async createSecurityGroup(@Args('input') input: CreateSecurityGroupInput) {
    return await this.securityGroupService.createSecurityGroup(input);
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
