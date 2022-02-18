import { InputType, Field } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsPhoneNumber,
  MinLength,
  MaxLength,
  IsISO31661Alpha2
} from 'class-validator';
import { Timestamp } from 'src/_common/graphql/timestamp.scalar';

@InputType()
export class SignUpInput {
  @Field()
  @IsNotEmpty()
  @MaxLength(30)
  firstName: string;

  @IsNotEmpty()
  @MaxLength(30)
  @Field()
  lastName: string;

  @IsNotEmpty()
  @Field(type => Timestamp)
  birthDate: Timestamp | number;

  @IsEmail()
  @IsOptional()
  @Field({ nullable: true })
  email?: string;

  @IsPhoneNumber('ZZ')
  @IsNotEmpty()
  @Field()
  phone: string;

  @Field()
  @MinLength(6)
  @MaxLength(30)
  @IsNotEmpty()
  password: string;

  @IsISO31661Alpha2()
  @IsNotEmpty()
  @Field()
  country: string;
}
