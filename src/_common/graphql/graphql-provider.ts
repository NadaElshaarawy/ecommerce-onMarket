import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { Request } from 'express';
import { join } from 'path';
import { AuthService } from 'src/Auth/auth.service';
import { User } from 'src/user/models/user.model';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  private authService: AuthService;
  constructor(private moduleRef: ModuleRef) {}
  async onModuleInit() {
    // Inject AuthService with this approach because AuthService does not exist at this time
    this.authService = await this.moduleRef.create(AuthService);
  }
  createGqlOptions() {
    return {
      playground: true,
      introspection: true,
      tracing: true,
      debug: true,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      installSubscriptionHandlers: true,
      context: async ({ req, connection }) => {
        let currentUser: User;
        if (connection && connection.context) currentUser = connection.context.currentUser;
        else currentUser = await this.authService.getUserFromReqHeaders(<Request>req);

        let locale = this.authService.getLocale(req);

        return {
          req,
          currentUser,
          lang: locale.lang,
          country: locale.country
        };
      }
    };
  }
}
