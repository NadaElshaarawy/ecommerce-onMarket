import { ObjectType, Field, Int } from '@nestjs/graphql';
export interface PaginationRes<T> {
  items: T[];
  pageInfo: PageInfo;
}

@ObjectType()
export abstract class PageInfo {
  @Field(type => Int)
  totalCount: number;

  @Field(type => Int)
  totalPages: number;

  @Field(type => Int)
  page: number;

  @Field(type => Int)
  limit: number;

  @Field(type => Boolean)
  hasNext: boolean;
}
