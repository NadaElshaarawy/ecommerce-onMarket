import { User } from 'src/user/models/user.model';

export interface GqlContext {
  currentUser?: User;
  req: Request;
}
