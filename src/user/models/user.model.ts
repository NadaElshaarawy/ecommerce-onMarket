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
  HasMany,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import { ID, Field, ObjectType } from '@nestjs/graphql';
import { UserVerificationCode } from './user-verification-code.model';
import { GenderEnum, LangEnum } from '../user.type';
import { paginate } from 'src/_common/paginator/paginator.service';
import { SecurityGroup } from 'src/security-group/security-group.model';

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

  @AllowNull(true)
  @ForeignKey(() => SecurityGroup)
  @Column({ type: DataType.UUID, onDelete: 'SET NULL', onUpdate: 'SET NULL' })
  securityGroupId?: string;

  @BelongsTo(() => SecurityGroup)
  @Field(() => SecurityGroup, { nullable: true })
  securityGroup?: SecurityGroup;

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

  static async paginate(filter = {}, sort = '-createdAt', page = 0, limit = 15, include: any = []) {
    return paginate<User>(this, filter, sort, page, limit, include);
  }
}
