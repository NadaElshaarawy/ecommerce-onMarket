import { Field, ObjectType, Int } from '@nestjs/graphql';
import { PaginationRes, PageInfo } from 'src/_common/paginator/paginator.types';
import { ClassType } from 'type-graphql';
import { Timestamp } from './timestamp.scalar';

export interface IGqlSuccessResponse<T> {
  code: number;
  success: boolean;
  message: string;
  data: T | PaginationRes<T>;
}

export function generateGqlResponseType<T, K>(
  TClass: ClassType<T> | ClassType<T>[],
  isArray?: K
): any {
  let fieldType = (() => {
    if (isArray) {
      return { type: TClass, name: `${TClass[0].name}s` };
    }
    if (Array.isArray(TClass)) {
      return {
        type: generateGqlPaginationResponseType<T>(TClass),
        name: `${TClass[0].name}sPaginated`
      };
    }
    return { type: TClass, name: TClass.name };
  })();

  @ObjectType(`Gql${fieldType.name}Response`)
  abstract class GqlResponse {
    @Field(type => fieldType.type, {
      ...(isArray ? { nullable: 'itemsAndList' } : { nullable: true })
    })
    data?: T;

    @Field(type => Int)
    code: number;

    @Field()
    success: boolean;

    @Field({ nullable: true })
    message?: string;
  }

  return GqlResponse;
}

export function generateGqlPaginationResponseType<T>(TClass: ClassType<T>[]): any {
  @ObjectType(`Gql${TClass[0].name}sPagination`)
  abstract class GqlPaginationResponse {
    @Field(type => TClass, { nullable: 'itemsAndList' })
    items?: T[];

    @Field(type => PageInfo)
    pageInfo: PageInfo;
  }
  return GqlPaginationResponse;
}

export const GqlStringResponse = generateGqlResponseType(String);
export const GqlStringArrayResponse = generateGqlResponseType([String], true);
export const GqlBooleanResponse = generateGqlResponseType(Boolean);
export const GqlTimestampResponse = generateGqlResponseType(Timestamp);
