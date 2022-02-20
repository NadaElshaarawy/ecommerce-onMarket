import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt
} from 'sequelize-typescript';
import { User } from 'src/user/models/user.model';
import { paginate } from 'src/_common/paginator/paginator.service';
import { OrderStatusEnum } from './order.type';

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

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({ onDelete: 'CASCADE', onUpdate: 'CASCADE', type: DataType.UUID })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @AllowNull(false)
  @Column({ type: DataType.DOUBLE })
  @Field(type => Float)
  totalAmount: number;

  @Default(OrderStatusEnum.NEW)
  @AllowNull(false)
  @Column({
    type: DataType.ENUM(OrderStatusEnum.NEW, OrderStatusEnum.COMPLETED, OrderStatusEnum.CANCELED)
  })
  @Field(() => OrderStatusEnum)
  orderStatus: OrderStatusEnum;

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
