import { generateGqlResponseType } from 'src/_common/graphql/graphql-response';
import { User } from './models/user.model';

export let gqlUsersPaginationResponse = generateGqlResponseType(Array(User));
export let gqlUsersArrayResponse = generateGqlResponseType(Array(User), true);
export let gqlUserResponse = generateGqlResponseType(User);
