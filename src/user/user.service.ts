import { Injectable } from '@nestjs/common';
import { getAllPermissions } from 'src/security-group/security-group-permissions';
import { SecurityGroup } from 'src/security-group/security-group.model';
import { User } from './models/user.model';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor() {}
  async seedAdmin(): Promise<boolean> {
    let superAdminSecurityGroup = await SecurityGroup.findOne({
      where: { groupName: 'SuperAdmin' }
    });
    if (!superAdminSecurityGroup)
      superAdminSecurityGroup = await SecurityGroup.create({
        groupName: 'SuperAdmin',
        permissions: getAllPermissions()
      });

    let superAdmin = await User.findOne({
      where: { securityGroupId: superAdminSecurityGroup.id }
    });
    if (!superAdmin)
      superAdmin = await User.create({
        firstName: `${process.env.APP_NAME}`,
        lastName: 'Admin',
        fullName: `${process.env.APP_NAME}` + ' Admin',
        slug: `${process.env.APP_NAME}-admin`,
        email: `admin@${process.env.APP_NAME}.com`,
        verifiedPhone: '+201011122233',
        password: await bcrypt.hash(`${process.env.APP_NAME}@123456`, 12),
        country: 'EG',
        isBlocked: false,
        securityGroupId: superAdminSecurityGroup.id
      });
    return true;
  }
}
