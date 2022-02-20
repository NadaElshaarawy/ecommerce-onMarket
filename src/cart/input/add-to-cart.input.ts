import { InputType, Field, ID, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID, Min } from 'class-validator';

@InputType()
export class AddToCartInput {
  @IsNotEmpty()
  @IsUUID('4')
  @Field(type => ID)
  itemId: string;

  @IsNotEmpty()
  @Min(1)
  @Field(type => Int)
  quantity: number;
}
