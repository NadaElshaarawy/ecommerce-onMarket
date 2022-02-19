import * as DataLoader from 'dataloader';
import { Injectable } from '@nestjs/common';
import { SecurityGroup } from 'src/security-group/security-group.model';

@Injectable()
export class UserDataloader {
  securityGroupLoader: DataLoader<string, SecurityGroup> = new DataLoader(
    async (securityGroupsIds: string[]) => {
      const securityGroups = await SecurityGroup.findAll({
        where: { id: securityGroupsIds }
      });
      return securityGroupsIds.map(securityGroupId =>
        securityGroups.find(securityGroup => securityGroup.id === securityGroupId)
      );
    }
  );
}
