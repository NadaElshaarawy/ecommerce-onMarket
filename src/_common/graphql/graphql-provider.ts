import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { join } from 'path';
import { User } from 'src/user/models/user.model';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  constructor() {}
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
        return { req, currentUser };
      }
    };
  }
}
