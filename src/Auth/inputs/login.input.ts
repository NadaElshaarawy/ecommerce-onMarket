import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsPhoneNumber, MaxLength, MinLength } from 'class-validator';

@InputType()
export class LoginInput {
  @IsPhoneNumber('ZZ')
  @IsNotEmpty()
  @Field()
  phone: string;

  @Field()
  @MinLength(6)
  @MaxLength(30)
  @IsNotEmpty()
  password: string;
}
