import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, GraphQLError } from 'graphql';

@Scalar('Timestamp')
export class Timestamp implements CustomScalar<number, number> {
  name: 'Timestamp';
  description: 'A unix timestamp in milliseconds';

  serialize(value): number {
    if (!(value instanceof Date) && typeof value !== 'number')
      throw new TypeError(`Value is not an instance of Date or Date timestamp: ${value}`);
    if (value instanceof Date) value = value.getTime();
    if (Number.isNaN(value)) throw new TypeError(`Value is not a valid Date: ${value}`);
    return value;
  }

  parseValue(value): number {
    return Number(value);
  }

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING)
      throw new GraphQLError(`Can only parse timestamps to dates but got a: ${ast.kind}`);
    return ast.value;
  }
}
