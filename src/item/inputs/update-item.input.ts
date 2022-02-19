import { InputType, Field, ID, Float } from '@nestjs/graphql';
import { ArrayMinSize, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

@InputType()
export class UpdateItemInput {
  @IsNotEmpty()
  @IsUUID('4')
  @Field(type => ID)
  itemId: string;

  @IsOptional()
  @Field({ nullable: true })
  name?: string;

  @IsOptional()
  @Field({ nullable: true })
  description?: string;

  @IsOptional()
  @Field(type => Float, { nullable: true })
  price?: number;

  @IsOptional()
  @Field({ nullable: true })
  isActive?: Boolean;

  @IsOptional()
  @ArrayMinSize(1)
  @Field(type => [String], { nullable: 'itemsAndList' })
  images?: string[];
}
