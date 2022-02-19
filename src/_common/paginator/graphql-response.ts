import { Field, ObjectType } from '@nestjs/graphql';
import { ClassType } from 'type-graphql';
import { PageInfo } from './paginator.types';

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
