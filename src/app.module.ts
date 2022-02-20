import { Module, ValidationPipe } from '@nestjs/common';
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
import { SecurityGroupModule } from './security-group/security-group.module';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from './_common/exceptions/exception-filter';
import { GqlResponseInterceptor } from './_common/graphql/graphql-response.interceptor';
import { OrderModule } from './order/order.module';
import { CartItemModule } from './cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    GraphQLModule.forRootAsync({
      imports: [AuthModule, UserModule],
      useClass: GqlConfigService,
      inject: [AuthService]
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    HelperModule,
    ItemModule,
    SecurityGroupModule,
    OrderModule,
    CartItemModule
  ],
  providers: [
    Timestamp,

    { provide: APP_PIPE, useClass: ValidationPipe },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: GqlResponseInterceptor }
  ]
})
export class AppModule {}
