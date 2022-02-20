import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Sequelize } from 'sequelize';
import { AppModule } from 'src/app.module';
import { UserService } from 'src/user/user.service';
import { BaseHttpException } from 'src/_common/exceptions/base-http-exception';
import { CreateItemInput } from '../inputs/create-item.input';
import { UpdateItemInput } from '../inputs/update-item.input';
import { Item } from '../item.model';
import { ItemService } from '../item.service';

jest.mock('../item.model');
describe('ItemService', () => {
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
        expect(e.messageKey).toBe(607);
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
});
