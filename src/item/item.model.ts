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

  @AllowNull(false)
  @Column
  @Field()
  description: string;

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
}
