import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
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
import { User } from 'src/user/models/user.model';
import { paginate } from 'src/_common/paginator/paginator.service';

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'CartItems'
})
@ObjectType()
export class CartItem extends Model<CartItem> {
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

  @ForeignKey(() => Item)
  @AllowNull(false)
  @Column({ onDelete: 'CASCADE', onUpdate: 'CASCADE', type: DataType.UUID })
  itemId: string;

  @BelongsTo(() => Item)
  item: Item;

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

  static async paginate(filter = {}, sort = '-createdAt', page = 0, limit = 15, include: any = []) {
    return paginate<CartItem>(this, filter, sort, page, limit, include);
  }
}
