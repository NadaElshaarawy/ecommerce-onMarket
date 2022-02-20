import { InputType, Field, ArgsType } from '@nestjs/graphql';
import { IsOptional, IsString, IsBoolean } from 'class-validator';

@InputType()
export class ItemsFilter {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  searchKey?: string;
}
