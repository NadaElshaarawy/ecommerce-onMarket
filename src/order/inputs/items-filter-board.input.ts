import { InputType, Field, ArgsType } from '@nestjs/graphql';
import { IsOptional, IsString, IsBoolean } from 'class-validator';

@InputType()
export class ItemFilterBoard {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  searchKey?: string;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
