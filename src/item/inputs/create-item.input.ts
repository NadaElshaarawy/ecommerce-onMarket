import { InputType, Field, Float } from '@nestjs/graphql';
import { ArrayMinSize, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateItemInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  name: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  description: string;

  @IsNotEmpty()
  @Field(type => Float)
  price: number;

  @IsOptional()
  @ArrayMinSize(1)
  @Field(type => [String], { nullable: 'itemsAndList' })
  images?: string[];
}
