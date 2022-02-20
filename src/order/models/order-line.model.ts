import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
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
import { Item } from 'src/item/item.model';
import { Order } from './order.model';

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'OrderLines'
})
@ObjectType()
export class OrderLine extends Model<OrderLine> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  @Field(() => ID)
  id: string;

  @ForeignKey(() => Order)
  @AllowNull(false)
  @Column({ onDelete: 'CASCADE', onUpdate: 'CASCADE', type: DataType.UUID })
  orderId: string;

  @BelongsTo(() => Order)
  order: Order;

  @ForeignKey(() => Item)
  @AllowNull(false)
  @Column({ onDelete: 'CASCADE', onUpdate: 'CASCADE', type: DataType.UUID })
  itemId: string;

  @BelongsTo(() => Item)
  item: Item;

  @AllowNull(false)
  @Column({ type: DataType.DOUBLE })
  @Field(type => Float)
  price: number;

  @Default(1)
  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  @Field(type => Int)
  quantity: number;

  @CreatedAt
  @Column({ type: DataType.DATE })
  createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  updatedAt: Date;
}
