import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './_common/database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from './user/user.module';
import { GqlConfigService } from './_common/graphql/graphql-provider';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    UserModule,
    GraphQLModule.forRootAsync({
      useClass: GqlConfigService
    })
  ]
})
export class AppModule {}
