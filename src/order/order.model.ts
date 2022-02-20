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
export class Order extends Model<Order> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  @Field(() => ID)
  id: string;

  @CreatedAt
  @Column({ type: DataType.DATE })
  createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  updatedAt: Date;

  static async paginate(filter = {}, sort = '-createdAt', page = 0, limit = 15, include: any = []) {
    return paginate<Order>(this, filter, sort, page, limit, include);
  }
}
