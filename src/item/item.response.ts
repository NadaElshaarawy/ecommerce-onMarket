import { generateGqlResponseType } from 'src/_common/graphql/graphql-response';
import { Item } from './item.model';

export let itemsPaginationResponse = generateGqlResponseType(Array(Item));
export let itemResponse = generateGqlResponseType(Item);
