import { generateGqlResponseType } from 'src/_common/graphql/graphql-response';
import { CartItem } from './cart.model';

export let gqlCartItemsPaginationResponse = generateGqlResponseType(Array(CartItem));
export let gqlCartItemResponse = generateGqlResponseType(CartItem);
