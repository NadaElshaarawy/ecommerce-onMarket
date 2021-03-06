import { User } from 'src/user/models/user.model';
import { UserVerificationCode } from 'src/user/models/user-verification-code.model';
import { Item } from 'src/item/item.model';
import { SecurityGroup } from 'src/security-group/security-group.model';
import { Order } from 'src/order/models/order.model';
import { CartItem } from 'src/cart/cart.model';

export const models = [User, UserVerificationCode, Item, SecurityGroup, Order, CartItem];
