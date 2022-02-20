import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Sequelize } from 'sequelize';
import { AppModule } from 'src/app.module';
import { UserService } from 'src/user/user.service';
import { BaseHttpException } from 'src/_common/exceptions/base-http-exception';
import { CreateItemInput } from '../inputs/create-item.input';
import { DeleteItemInput } from '../inputs/delete-item.input';
import { UpdateItemInput } from '../inputs/update-item.input';
import { Item } from '../item.model';
import { ItemService } from '../item.service';

jest.mock('../item.model');
describe('ItemService', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe('createItemBoard', () => {
    it('create item', async () => {
      const input: CreateItemInput = { name: 'name', price: 100 };

      let mockedCreateItem = jest
        .fn()
        .mockReturnValue(Promise.resolve({ name: 'name', price: 100 }));
      jest.spyOn(Item, 'create').mockImplementation(mockedCreateItem);
      const res = await new ItemService().createItemBoard(input);

      expect(res.name).toBe('name');
      expect(res.price).toBe(100);
      expect(Item.create).toBeCalledTimes(1);
      expect(Item.create).toBeCalledWith(input);
    });
  });

  describe('updateItemBoard', () => {
    it('throw exception if item not exist', async () => {
      const input: UpdateItemInput = { itemId: '1' };
      let notFoundItem = jest.fn().mockReturnValue(Promise.resolve(null));
      jest.spyOn(Item, 'findOne').mockImplementation(notFoundItem);
      try {
        await new ItemService().updateItemBoard(input);
      } catch (e) {
        expect(e).toBeInstanceOf(BaseHttpException);
        expect(e.getStatus()).toBe(607);
      }
    });

    it('update item', async () => {
      const input: UpdateItemInput = { itemId: '1', name: 'updated name' };

      const item = { id: '1', name: 'name', price: 100, update: () => {} };
      let ItemBeforeUpdate = jest.fn().mockReturnValue(Promise.resolve(item));
      jest.spyOn(Item, 'findOne').mockImplementation(ItemBeforeUpdate);

      const itemUpdatedObject = { id: '1', name: 'updated name', price: 100 };
      let ItemAfterUpdate = jest.fn().mockReturnValue(Promise.resolve(itemUpdatedObject));
      jest.spyOn(item, 'update').mockImplementation(ItemAfterUpdate);

      try {
        const res = await new ItemService().updateItemBoard(input);
        expect(res.name).toBe('updated name');
        expect(res.id).toBe('1');
        expect(res.price).toBe(100);
        expect(Item.findOne).toBeCalledTimes(1);
      } catch (e) {
        expect(e).toBeNull();
      }
    });
  });

  describe('deleteItemBoard', () => {
    it('throw exception if item not exist', async () => {
      const input: DeleteItemInput = { itemId: '1' };
      let notFoundItem = jest.fn().mockReturnValue(Promise.resolve(null));
      jest.spyOn(Item, 'findOne').mockImplementation(notFoundItem);
      try {
        await new ItemService().deleteItemBoard(input);
      } catch (e) {
        expect(e).toBeInstanceOf(BaseHttpException);
        expect(e.getStatus()).toBe(607);
      }
    });

    it('delete item', async () => {
      const input: DeleteItemInput = { itemId: '1' };

      const item = { id: '1', name: 'name', price: 100 };
      let ItemBeforeDestroy = jest.fn().mockReturnValue(Promise.resolve(item));
      jest.spyOn(Item, 'findOne').mockImplementation(ItemBeforeDestroy);

      let itemDestroyResponse = jest.fn().mockReturnValue(Promise.resolve(true));
      jest.spyOn(Item, 'destroy').mockImplementation(itemDestroyResponse);

      try {
        const res = await new ItemService().deleteItemBoard(input);
        expect(res).toBe(true);
        expect(Item.findOne).toBeCalledTimes(1);
        expect(Item.destroy).toBeCalledTimes(1);
      } catch (e) {
        expect(e).toBeNull();
      }
    });
  });

  describe('itemOrError', () => {
    it('throw exception if item not exist', async () => {
      const itemId = '1';
      let notFoundItem = jest.fn().mockReturnValue(Promise.resolve(null));
      jest.spyOn(Item, 'findOne').mockImplementation(notFoundItem);
      try {
        await new ItemService().itemOrError(itemId);
      } catch (e) {
        expect(e).toBeInstanceOf(BaseHttpException);
        expect(e.getStatus()).toBe(607);
      }
    });

    it('item', async () => {
      const itemId = '1';

      const item = { id: '1', name: 'name', price: 100 };
      let mockedItem = jest.fn().mockReturnValue(Promise.resolve(item));
      jest.spyOn(Item, 'findOne').mockImplementation(mockedItem);

      try {
        const res = await new ItemService().itemOrError(itemId);
        expect(res.id).toBe('1');
        expect(Item.findOne).toBeCalledTimes(1);
      } catch (e) {
        expect(e).toBeNull();
      }
    });
  });

  describe('singleItemForCustomer', () => {
    it('throw exception if item not exist', async () => {
      const itemId = '1';
      let notFoundItem = jest.fn().mockReturnValue(Promise.resolve(null));
      jest.spyOn(Item, 'findOne').mockImplementation(notFoundItem);
      try {
        await new ItemService().singleItemForCustomer(itemId);
      } catch (e) {
        expect(e).toBeInstanceOf(BaseHttpException);
        expect(e.getStatus()).toBe(607);
      }
    });

    it('throw error if item is not active', async () => {
      const itemId = '1';

      const item = { id: '1', name: 'name', price: 100, isActive: false };
      let mockedItem = jest.fn().mockReturnValue(Promise.resolve(item));
      jest.spyOn(Item, 'findOne').mockImplementation(mockedItem);

      try {
        const res = await new ItemService().singleItemForCustomer(itemId);
      } catch (e) {
        expect(e).toBeInstanceOf(BaseHttpException);
        expect(e.getStatus()).toBe(607);
      }
    });

    it('item', async () => {
      const itemId = '1';

      const item = { id: '1', name: 'name', price: 100, isActive: true };
      let mockedItem = jest.fn().mockReturnValue(Promise.resolve(item));
      jest.spyOn(Item, 'findOne').mockImplementation(mockedItem);

      try {
        const res = await new ItemService().singleItemForCustomer(itemId);
        expect(res.id).toBe('1');
        expect(Item.findOne).toBeCalledTimes(1);
      } catch (e) {
        expect(e).toBeNull();
      }
    });
  });
});
