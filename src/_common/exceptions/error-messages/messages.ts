import { IErrorMessage } from '../error-messages-interface';

export const enErrorMessage: IErrorMessage = {
  PERMISSION_DENIED: 'PERMISSION DENIED',
  UNAUTHORIZED: 'Unauthorized',
  EMAIL_ALREADY_EXISTS: 'EMAIL already exists',
  PHONE_ALREADY_EXISTS: 'PHONE already exists',
  INVALID_CREDENTIALS: 'Invalid credentials',
  BLOCKED_USER: 'Blocked user',
  USER_DOES_NOT_EXIST: 'User does not exist',
  ITEM_NOT_EXIST: 'Item not exist',
  SAME_SECURITY_GROUP: 'Security group with same name already exist',
  CAN_NOT_DELETE_SUPER_ADMIN_GROUP: 'You can not delete super admin security group',
  SECURITY_GROUP_NOT_EXIST: 'Security group does not exist'
};
