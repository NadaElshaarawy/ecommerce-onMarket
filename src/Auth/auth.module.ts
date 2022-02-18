import { Module } from '@nestjs/common';
import { HelperModule } from 'src/_common/utils/helper.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AuthTransformer } from './auth.transformer';

@Module({
  imports: [HelperModule],
  providers: [AuthTransformer, AuthService, AuthResolver],
  exports: [AuthService, AuthTransformer]
})
export class AuthModule {}
