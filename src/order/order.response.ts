import { generateGqlResponseType } from 'src/_common/graphql/graphql-response';
import { Order } from './order.model';

export let gqlOrdersPaginationResponse = generateGqlResponseType(Array(Order));
export let gqlOrderResponse = generateGqlResponseType(Order);
