import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/Auth/auth.guard';
import { HasPermission } from 'src/Auth/auth.metadata';
import { ItemPermissionsEnum } from 'src/security-group/security-group-permissions';
import { GqlBooleanResponse } from 'src/_common/graphql/graphql-response';
import { NullablePaginatorInput } from 'src/_common/paginator/paginator.input';
import { CreateItemInput } from './inputs/create-item.input';
import { DeleteItemInput } from './inputs/delete-item.input';
import { ItemInput } from './inputs/item.input';
import { ItemFilterBoard } from './inputs/items-filter-board.input';
import { ItemsFilter } from './inputs/items-filter.input';
import { UpdateItemInput } from './inputs/update-item.input';
import { Item } from './item.model';
import { gqlItemResponse, gqlItemsPaginationResponse } from './item.response';
import { ItemService } from './item.service';

@Resolver(() => Item)
export class ItemResolver {
  constructor(private readonly itemService: ItemService) {}

  //** --------------------- MUTATIONS --------------------- */

  @HasPermission(ItemPermissionsEnum.CREATE_ITEMS)
  @UseGuards(AuthGuard)
  @Mutation(returns => gqlItemResponse)
  async createItemBoard(@Args('input') input: CreateItemInput) {
    return await this.itemService.createItemBoard(input);
  }

  @HasPermission(ItemPermissionsEnum.UPDATE_ITEMS)
  @UseGuards(AuthGuard)
  @Mutation(returns => gqlItemResponse)
  async updateItemBoard(@Args('input') input: UpdateItemInput) {
    return await this.itemService.updateItemBoard(input);
  }

  @HasPermission(ItemPermissionsEnum.DELETE_ITEMS)
  @UseGuards(AuthGuard)
  @Mutation(returns => GqlBooleanResponse)
  async deleteItemBoard(@Args() input: DeleteItemInput) {
    return await this.itemService.deleteItemBoard(input);
  }

  //** --------------------- QUERIES --------------------- */

  @HasPermission(ItemPermissionsEnum.READ_ITEMS)
  @UseGuards(AuthGuard)
  @Query(returns => gqlItemResponse)
  async itemBoard(@Args() input: ItemInput) {
    return await this.itemService.itemOrError(input.itemId);
  }

  @UseGuards(AuthGuard)
  @Query(returns => gqlItemResponse)
  async singleItemForCustomer(@Args() input: ItemInput) {
    return await this.itemService.singleItemForCustomer(input.itemId);
  }
  @HasPermission(ItemPermissionsEnum.READ_ITEMS)
  @UseGuards(AuthGuard)
  @Query(returns => gqlItemsPaginationResponse)
  async itemsBoard(
    @Args('filter') filter: ItemFilterBoard,
    @Args() paginate: NullablePaginatorInput
  ) {
    return await this.itemService.itemsBoard(filter, paginate.paginate);
  }

  @Query(returns => gqlItemsPaginationResponse)
  async items(@Args('filter') filter: ItemsFilter, @Args() paginate: NullablePaginatorInput) {
    return await this.itemService.items(filter, paginate.paginate);
  }
}
