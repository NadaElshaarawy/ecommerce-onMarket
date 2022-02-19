import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { GqlContext } from 'src/_common/graphql/graphql-context.type';
import { CreateSecurityGroupInput } from './inputs/create-security-group.input';
import { DeleteSecurityGroupInput } from './inputs/delete-security-group.input';
import { SecurityGroup } from './security-group.model';

@Injectable()
export class SecurityGroupService {
  constructor(@Inject(CONTEXT) private readonly context: GqlContext) {}

  async createSecurityGroup(input: CreateSecurityGroupInput): Promise<SecurityGroup> {
    const otherSecurityGroupWithSameName = await SecurityGroup.findOne({
      where: { groupName: input.groupName }
    });
    if (otherSecurityGroupWithSameName)
      throw new HttpException('Security group with same name already exist', 614);
    return await SecurityGroup.create(input);
  }

  async securityGroups(): Promise<SecurityGroup[]> {
    return await SecurityGroup.findAll();
  }

  async deleteSecurityGroup(input: DeleteSecurityGroupInput) {
    const group = await this.securityGroupOrError(input.securityGroupId);
    if (group.groupName === 'SuperAdmin')
      throw new HttpException('Can not delete super admin group', 615);
    await SecurityGroup.destroy({ where: { id: input.securityGroupId } });
    return true;
  }

  async securityGroupOrError(securityGroupId: string): Promise<SecurityGroup> {
    const securityGroup = await SecurityGroup.findOne({
      where: { id: securityGroupId }
    });
    if (!securityGroup) throw new HttpException('Security group does not exist', 616);
    return securityGroup;
  }
}
