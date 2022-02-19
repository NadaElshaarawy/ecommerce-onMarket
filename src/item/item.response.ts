import { generateGqlPaginationResponseType } from 'src/_common/graphql/graphql-response';
import { Item } from './item.model';

export let itemsPaginationResponse = generateGqlPaginationResponseType(Array(Item));
