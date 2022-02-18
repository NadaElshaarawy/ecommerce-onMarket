import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  AllowNull,
  Default,
  Unique,
  CreatedAt,
  UpdatedAt,
  HasMany
} from 'sequelize-typescript';
import { ID, Field, ObjectType } from '@nestjs/graphql';
import { UserVerificationCode } from './user-verification-code.model';
import { GenderEnum, LangEnum } from '../user.type';

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'Users',
  indexes: [{ fields: [{ name: 'isBlocked' }] }]
})
@ObjectType()
export class User extends Model<User> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  @Field(() => ID)
  id: string;

  @AllowNull(false)
  @Column
  @Field()
  firstName: string;

  @AllowNull(false)
  @Column
  @Field()
  lastName: string;

  @AllowNull(false)
  @Column
  @Field()
  fullName?: string;

  @Unique
  @AllowNull(false)
  @Column
  @Field()
  slug: string;

  @Unique
  @AllowNull(true)
  @Column
  @Field({ nullable: true })
  email?: string;

  @AllowNull(true)
  @Column
  notVerifiedPhone?: string;

  @Unique
  @AllowNull(true)
  @Column
  @Field({ nullable: true })
  verifiedPhone?: string;

  @AllowNull(true)
  @Column
  password: string;

  @Default(GenderEnum.MALE)
  @AllowNull(false)
  @Column({ type: DataType.ENUM('MALE', 'FEMALE') })
  @Field(() => GenderEnum)
  gender: GenderEnum;

  @AllowNull(true)
  @Column({ type: DataType.DATE })
  birthDate?: Date;

  @AllowNull(false)
  @Column
  @Field()
  country: string;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  @Field({ nullable: true })
  profilePicture?: string;

  @Default(false)
  @AllowNull(false)
  @Column
  @Field()
  isBlocked: boolean;

  @Default(LangEnum.EN)
  @AllowNull(false)
  @Column({ type: DataType.ENUM('EN', 'AR') })
  @Field(() => LangEnum)
  favLang: LangEnum;

  @HasMany(() => UserVerificationCode)
  userVerificationCodes?: UserVerificationCode[];

  @Field({ nullable: true })
  token?: string;

  @CreatedAt
  @Column({ type: DataType.DATE })
  createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  updatedAt: Date;
}
