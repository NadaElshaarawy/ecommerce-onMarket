import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import {
  AllowNull,
  Column,
  CreatedAt,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt
} from 'sequelize-typescript';
import { paginate } from 'src/_common/paginator/paginator.service';

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'Items'
})
@ObjectType()
export class Item extends Model<Item> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  @Field(() => ID)
  id: string;

  @AllowNull(false)
  @Column
  @Field()
  name: string;

  @AllowNull(true)
  @Column
  @Field({ nullable: true })
  description?: string;

  @AllowNull(false)
  @Column({ type: DataType.DOUBLE })
  @Field(type => Float)
  price: number;

  @AllowNull(true)
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  @Field(type => [String], { nullable: 'itemsAndList' })
  images?: string[];

  @Default(true)
  @AllowNull(false)
  @Column
  @Field()
  isActive: boolean;

  @CreatedAt
  @Column({ type: DataType.DATE })
  createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  updatedAt: Date;

  static async paginate(filter = {}, sort = '-createdAt', page = 0, limit = 15, include: any = []) {
    return paginate<Item>(this, filter, sort, page, limit, include);
  }
}
