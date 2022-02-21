import { HttpException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PaginatorInput } from 'src/_common/paginator/paginator.input';
import { PaginationRes } from 'src/_common/paginator/paginator.types';
import { app } from '../../../test/before-test-run';
import { CartItem } from '../cart.model';
import { CartItemService } from '../cart.service';
import { AddToCartInput } from '../input/add-to-cart.input';

jest.mock('../cart.model');
describe('CartItemService', () => {
  let cartItemService: CartItemService;

  beforeEach(async () => {
    jest.resetAllMocks();
    const moduleRef = await Test.createTestingModule({
      providers: [CartItemService]
    }).compile();
    cartItemService = moduleRef.get(CartItemService);
  });

  describe('addToCart', () => {
    it('add to cart', async () => {
      const input: AddToCartInput = { itemId: '1', quantity: 2 };
      let mockedCartItem = jest.fn().mockReturnValue(Promise.resolve({ ...input, id: '1' }));
      jest.spyOn(CartItem, 'create').mockImplementation(mockedCartItem);
      try {
        (await app.resolve(CartItemService)).addToCart(input);
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
      }
    });
  });

  describe('getCartItems', () => {
    it('get paginated cart items', async () => {
      const input: PaginatorInput = { page: 1, limit: 15 };
      let mockedCartItems = jest
        .fn()
        .mockReturnValue(
          Promise.resolve({ items: [{ id: '1', quantity: 2 }], pageInfo: { page: 1, limit: 15 } })
        );
      jest.spyOn(CartItem, 'paginate').mockImplementation(mockedCartItems);
      try {
        (await app.resolve(CartItemService)).getCartItems(input);
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
      }
    });
  });

  describe('CartItemOrError', () => {
    it('throw exception if cart item not exist', async () => {
      const cartItemId = '1';
      let notFoundItem = jest.fn().mockReturnValue(Promise.resolve(null));
      jest.spyOn(CartItem, 'findOne').mockImplementation(notFoundItem);
      try {
        (await app.resolve(CartItemService)).cartItemOrError(cartItemId);
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
      }
    });

    it('cartItemOrError', async () => {
      const cartItemId = '1';
      const cartItem = { id: '1', itemId: '2', userId: '3', quantity: 2 };
      let mockedCartItem = jest.fn().mockReturnValue(Promise.resolve(cartItem));
      jest.spyOn(CartItem, 'findOne').mockImplementation(mockedCartItem);

      try {
        const res = await (await app.resolve(CartItemService)).cartItemOrError(cartItemId);
        expect(res.id).toBe('updated name');
        expect(res.id).toBe('1');
        expect(res.itemId).toBe('2');
        expect(CartItem.findOne).toBeCalledTimes(1);
      } catch (e) {
        expect(e).toBeNull();
      }
    });
  });
});
