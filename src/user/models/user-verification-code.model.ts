import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  Default,
  BelongsTo,
  AllowNull
} from 'sequelize-typescript';
import { User } from './user.model';

@Table({ timestamps: true, tableName: 'UserVerificationCodes' })
export class UserVerificationCode extends Model<UserVerificationCode> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  id: string;

  @AllowNull(false)
  @Column
  code: string;

  @AllowNull(false)
  @Column({ type: DataType.DATE })
  expiryDate: Date;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({ onDelete: 'CASCADE', onUpdate: 'CASCADE', type: DataType.UUID })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}
