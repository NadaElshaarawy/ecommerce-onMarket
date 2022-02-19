import { SetMetadata } from '@nestjs/common';

export const HasPermission = (argument: string) => SetMetadata('permission', argument);
