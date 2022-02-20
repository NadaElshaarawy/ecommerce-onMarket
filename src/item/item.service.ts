import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { BaseHttpException } from 'src/_common/exceptions/base-http-exception';
import { ErrorCodeEnum } from 'src/_common/exceptions/error-code.enum';
import { PaginatorInput } from 'src/_common/paginator/paginator.input';
import { PaginationRes } from 'src/_common/paginator/paginator.types';
import { CreateItemInput } from './inputs/create-item.input';
import { DeleteItemInput } from './inputs/delete-item.input';
import { ItemFilterBoard } from './inputs/items-filter-board.input';
import { ItemsFilter } from './inputs/items-filter.input';
import { UpdateItemInput } from './inputs/update-item.input';
import { Item } from './item.model';

@Injectable()
export class ItemService {
  async createItemBoard(input: CreateItemInput): Promise<Item> {
    return await Item.create(input);
  }

  async updateItemBoard(input: UpdateItemInput): Promise<Item> {
    const item = await this.itemOrError(input.itemId);
    return await item.update({ input });
  }

  async deleteItemBoard(input: DeleteItemInput): Promise<Boolean> {
    await this.itemOrError(input.itemId);
    await Item.destroy({ where: { id: input.itemId } });
    return true;
  }

  async itemOrError(itemId: string): Promise<Item> {
    const item = await Item.findOne({ where: { id: itemId } });
    if (!item) throw new BaseHttpException(ErrorCodeEnum.ITEM_NOT_EXIST);
    return item;
  }

  async singleItemForCustomer(itemId: string): Promise<Item> {
    const item = await this.itemOrError(itemId);
    if (!item.isActive) throw new BaseHttpException(ErrorCodeEnum.ITEM_NOT_EXIST);
    return item;
  }

  async itemsBoard(
    filter: ItemFilterBoard = {},
    paginate: PaginatorInput = {}
  ): Promise<PaginationRes<Item>> {
    return await Item.paginate(
      {
        ...(filter.isActive !== undefined && { isActive: filter.isActive }),
        ...(filter.searchKey && {
          [Op.or]: {
            name: { [Op.iLike]: `%${filter.searchKey}%` },
            description: { [Op.iLike]: `%${filter.searchKey}%` }
          }
        })
      },
      '-createdAt',
      paginate.page,
      paginate.limit
    );
  }

  async items(
    filter: ItemsFilter = {},
    paginate: PaginatorInput = {}
  ): Promise<PaginationRes<Item>> {
    return await Item.paginate(
      {
        isActive: true,
        ...(filter.searchKey && {
          [Op.or]: {
            enQuestion: { [Op.iLike]: `%${filter.searchKey}%` },
            arQuestion: { [Op.iLike]: `%${filter.searchKey}%` }
          }
        })
      },
      '-createdAt',
      paginate.page,
      paginate.limit
    );
  }
}
