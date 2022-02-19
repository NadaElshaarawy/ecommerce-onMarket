import { Module } from '@nestjs/common';
import { UserResolver } from './resolvers/user.resolver';
import { UserDataloader } from './user.dataloader';
import { UserService } from './user.service';

@Module({
  imports: [],
  providers: [UserResolver, UserService, UserDataloader],
  exports: []
})
export class UserModule {}
