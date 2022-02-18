import { plural } from 'pluralize';
import { User } from 'src/user/models/user.model';
import { UserVerificationCode } from 'src/user/models/user-verification-code.model';
import { Item } from 'src/item/item.model';

export const models = [User, UserVerificationCode, Item];
