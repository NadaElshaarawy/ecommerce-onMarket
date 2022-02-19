import { Module } from '@nestjs/common';
import { UserResolver } from './resolvers/user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [],
  providers: [UserResolver, UserService],
  exports: []
})
export class UserModule {}
