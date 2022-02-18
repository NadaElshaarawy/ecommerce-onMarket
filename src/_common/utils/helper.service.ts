import * as bcrypt from 'bcryptjs';
import * as slug from 'speakingurl';
import { generate } from 'voucher-code-generator';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HelperService {
  public slugify(value: string): string {
    if (value.charAt(value.length - 1) === '-') value = value.slice(0, value.length - 1);
    return `${slug(value, { titleCase: true })}-${
      generate({
        charset: '123456789abcdefghgklmnorstuvwxyz',
        length: 4
      })[0]
    }`.toLowerCase();
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }
}
