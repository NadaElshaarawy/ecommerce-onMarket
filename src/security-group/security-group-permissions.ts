export enum UserPermissionsEnum {
  READ_USERS = 'READ_USERS',
  UPDATE_USERS = 'UPDATE_USERS',
  CREATE_USERS = 'CREATE_USERS',
  DELETE_USERS = 'DELETE_USERS'
}

export enum SecurityGroupPermissionsEnum {
  READ_SECURITY_GROUPS = 'READ_SECURITY_GROUPS',
  UPDATE_SECURITY_GROUPS = 'UPDATE_SECURITY_GROUPS',
  CREATE_SECURITY_GROUPS = 'CREATE_SECURITY_GROUPS',
  DELETE_SECURITY_GROUPS = 'DELETE_SECURITY_GROUPS',
  ASSIGN_SECURITY_GROUPS_TO_USERS = 'ASSIGN_SECURITY_GROUPS_TO_USERS',
  UN_ASSIGN_SECURITY_GROUPS_TO_USERS = 'UN_ASSIGN_SECURITY_GROUPS_TO_USERS'
}

export enum ItemPermissionsEnum {
  READ_ITEMS = 'READ_ITEMS',
  UPDATE_ITEMS = 'UPDATE_ITEMS',
  CREATE_ITEMS = 'CREATE_ITEMS',
  DELETE_ITEMS = 'DELETE_ITEMS'
}

export const permissions = {
  users: Object.keys(UserPermissionsEnum),
  securityGroups: Object.keys(SecurityGroupPermissionsEnum),
  items: Object.keys(ItemPermissionsEnum)
};

export function getAllPermissions(): string[] {
  return Object.values(permissions).reduce((total, row) => {
    total.push(...row);
    return total;
  }, []);
}
