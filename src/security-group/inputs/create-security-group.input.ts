import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export abstract class CreateSecurityGroupInput {
  @IsNotEmpty()
  @Field()
  readonly groupName: string;

  @IsOptional()
  @Field({ nullable: true })
  readonly description?: string;

  @Field(type => [String])
  readonly permissions: string[];
}
