import { User } from 'src/user/models/user.model';
import { LangEnum } from 'src/user/user.type';

export class GqlContextMock {
  currentUser?: User;
  req: Request;
  lang: LangEnum;
  country: string;
}
