import { generateGqlResponseType } from 'src/_common/graphql/graphql-response';
import { SecurityGroup } from './security-group.model';

export let gqlSecurityGroupsPaginationResponse = generateGqlResponseType(Array(SecurityGroup));
export let gqlSecurityGroupsArrayResponse = generateGqlResponseType(Array(SecurityGroup), true);
export let gqlSecurityGroupResponse = generateGqlResponseType(SecurityGroup);
