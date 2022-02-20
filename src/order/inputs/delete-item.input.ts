import { Field, ID, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@ArgsType()
export class DeleteItemInput {
  @IsNotEmpty()
  @IsUUID('4')
  @Field()
  itemId: string;
}
