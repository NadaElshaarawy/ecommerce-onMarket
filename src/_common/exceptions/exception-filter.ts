import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { DatabaseError } from 'sequelize';
import { BaseHttpException } from './base-http-exception';
import { MessageSource } from './errors';

// Catch any error type
@Catch()
export class HttpExceptionFilter implements GqlExceptionFilter {
  private response = {
    code: 500,
    success: false,
    message: 'Something went wrong!'
  };

  constructor() {}

  catch(exception: unknown, host: ArgumentsHost) {
    console.log('message');
    if (exception instanceof HttpException) {
      const gqlHost = GqlArgumentsHost.create(host);
      const currentGqlInfo = gqlHost.getInfo();
      const currentGqlCtx = gqlHost.getContext();
      console.log('------------------------------');

      let myException = exception as BaseHttpException;
      console.log('------------------------------');

      let params = myException.getParams;
      const messageKey = exception.getStatus().toString();

      let localizedMessage = new MessageSource().getMessage(messageKey, currentGqlCtx.lang, params);
      if (!localizedMessage) localizedMessage = exception.getResponse().toString();

      console.log(
        `${HttpExceptionFilter.name}-${
          currentGqlInfo ? currentGqlInfo.fieldName : 'UnKnown GQL Context'
        }`
      );
      let message = exception.getResponse() as any;
      console.log(message);

      const trace = `Operation body: ${
        currentGqlCtx.req ? JSON.stringify(currentGqlCtx.req.body) : 'None'
      }
        Current user: ${currentGqlCtx.currentUser ? currentGqlCtx.currentUser.id : 'No user'}`;
      if (typeof message === 'object') {
        console.log(`Message: ${message.error}`, `\n\n\n\n\n\n Stack: ${trace}`, '\n\n\n\n\n\n');
        message = `${message.error} - ${JSON.stringify(message.message)}`;
      } else {
        console.log('here');
        console.log(`Message: ${message}`, `\n\n\n\n\n\n Stack: ${trace}`, '\n\n\n\n\n\n');
      }
      this.response.code = exception.getStatus();
      this.response.message = localizedMessage;
      console.log(this.response, 'resssssssssss');

      return this.response;
    }

    if (exception instanceof DatabaseError) {
      this.response.code = 500;
      this.response.message = exception.message;
      console.log(
        `Message: ${exception.message}`,
        `\n\n\n\n\n\n Stack: ${exception.stack}`,
        `\n\n\n\n\n\n SQL: ${exception.sql}`,
        '\n\n\n\n\n\n'
      );
      return this.response;
    }

    console.log('Error', exception instanceof Error ? exception.stack : exception);
    this.response.code = 500;
    this.response.message = 'Something went wrong!';
    console.log(this.response);

    return this.response;
  }
}
