import { generateGqlResponseType } from 'src/_common/graphql/graphql-response';
import { SecurityGroup } from './security-group.model';

export let securityGroupsPaginationResponse = generateGqlResponseType(Array(SecurityGroup));
export let securityGroupsArrayResponse = generateGqlResponseType(Array(SecurityGroup), true);
export let securityGroupResponse = generateGqlResponseType(SecurityGroup);
