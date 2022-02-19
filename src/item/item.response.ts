import { generateGqlPaginationResponseType } from 'src/_common/paginator/graphql-response';
import { Item } from './item.model';

export let itemsPaginationResponse = generateGqlPaginationResponseType(Array(Item));
