import { InputType, Field, ID, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsUUID, Min } from 'class-validator';

@InputType()
export class UpdateCartItemInput {
  @IsNotEmpty()
  @IsUUID('4')
  @Field(type => ID)
  cartItemId: string;

  @IsOptional()
  @Min(1)
  @Field(type => Int, { nullable: true })
  quantity?: number;
}
