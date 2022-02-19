import { Module } from '@nestjs/common';
import { SecurityGroupResolver } from './security-group.resolver';
import { SecurityGroupService } from './security-group.service';

@Module({
  providers: [SecurityGroupResolver, SecurityGroupService],
  exports: [SecurityGroupService]
})
export class SecurityGroupModule {}
