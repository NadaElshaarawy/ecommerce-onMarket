import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/user/models/user.model';
import { BaseHttpException } from 'src/_common/exceptions/base-http-exception';
import { ErrorCodeEnum } from 'src/_common/exceptions/error-code.enum';
import { GqlContext } from 'src/_common/graphql/graphql-context.type';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const permission = this.reflector.get<string>('permission', context.getHandler());

    const { currentUser } = ctx.getContext() as GqlContext;
    if (!currentUser) throw new BaseHttpException(ErrorCodeEnum.UNAUTHORIZED);
    if (permission && !this.hasPermission(permission, currentUser))
      throw new BaseHttpException(ErrorCodeEnum.UNAUTHORIZED);
    return true;
  }

  hasPermission(permission: string, user: User): boolean {
    if (!user?.securityGroup?.id) return false;
    return user.securityGroup.permissions.includes(permission);
  }
}
