import { generateGqlResponseType } from 'src/_common/graphql/graphql-response';
import { Item } from './item.model';

export let gqlItemsPaginationResponse = generateGqlResponseType(Array(Item));
export let gqlItemResponse = generateGqlResponseType(Item);
