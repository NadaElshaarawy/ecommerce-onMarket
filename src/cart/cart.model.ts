import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
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
  tableName: 'CartItems'
})
@ObjectType()
export class CartItem extends Model<CartItem> {
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
    return paginate<CartItem>(this, filter, sort, page, limit, include);
  }
}
