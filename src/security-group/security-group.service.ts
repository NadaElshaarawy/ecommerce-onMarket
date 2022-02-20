import { Injectable } from '@nestjs/common';
import { BaseHttpException } from 'src/_common/exceptions/base-http-exception';
import { ErrorCodeEnum } from 'src/_common/exceptions/error-code.enum';
import { CreateSecurityGroupInput } from './inputs/create-security-group.input';
import { DeleteSecurityGroupInput } from './inputs/delete-security-group.input';
import { SecurityGroup } from './security-group.model';

@Injectable()
export class SecurityGroupService {
  async createSecurityGroup(input: CreateSecurityGroupInput): Promise<SecurityGroup> {
    const otherSecurityGroupWithSameName = await SecurityGroup.findOne({
      where: { groupName: input.groupName }
    });
    if (otherSecurityGroupWithSameName)
      throw new BaseHttpException(ErrorCodeEnum.SAME_SECURITY_GROUP);
    return await SecurityGroup.create(input);
  }

  async securityGroups(): Promise<SecurityGroup[]> {
    return await SecurityGroup.findAll();
  }

  async deleteSecurityGroup(input: DeleteSecurityGroupInput) {
    const group = await this.securityGroupOrError(input.securityGroupId);
    //TODO Add configuration model into db to let the global admin group name dynamic
    if (group.groupName === 'SuperAdmin')
      throw new BaseHttpException(ErrorCodeEnum.CAN_NOT_DELETE_SUPER_ADMIN_GROUP);
    await SecurityGroup.destroy({ where: { id: input.securityGroupId } });
    return true;
  }

  async securityGroupOrError(securityGroupId: string): Promise<SecurityGroup> {
    const securityGroup = await SecurityGroup.findOne({
      where: { id: securityGroupId }
    });
    if (!securityGroup) throw new BaseHttpException(ErrorCodeEnum.SECURITY_GROUP_NOT_EXIST);
    return securityGroup;
  }
}
