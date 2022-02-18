import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './_common/database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from './user/user.module';
import { GqlConfigService } from './_common/graphql/graphql-provider';
import { AuthModule } from './Auth/auth.module';
import { Timestamp } from './_common/graphql/timestamp.scalar';
import { HelperModule } from './_common/utils/helper.module';
import { AuthService } from './Auth/auth.service';
import { ItemModule } from './item/item.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    GraphQLModule.forRootAsync({
      imports: [AuthModule],
      useClass: GqlConfigService,
      inject: [AuthService]
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    HelperModule,
    ItemModule
  ],
  providers: [Timestamp]
})
export class AppModule {}
