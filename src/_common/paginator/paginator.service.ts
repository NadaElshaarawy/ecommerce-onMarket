import { PaginationRes } from './paginator.types';
import { Literal } from 'sequelize/types/lib/utils';
import { FindAttributeOptions } from 'sequelize/types';

export const paginate = async <T>(
  model,
  filter = {},
  sort: string | Literal = '-createdAt',
  page = 0,
  limit = 15,
  include: any = [],
  attributes: FindAttributeOptions = null
): Promise<PaginationRes<T>> => {
  let totalPages = 0,
    totalCount = 0,
    hasNext = false;
  totalCount = await model.count({ where: filter, include });
  if (limit > 100) limit = 100;
  if (limit < 0) limit = 15;
  if (page < 0) page = 0;
  totalPages = totalCount / limit < 1 ? 1 : Math.ceil(totalCount / limit);
  let offset = page > 1 ? (page - 1) * limit : 0;
  hasNext = offset + limit < totalCount;
  if (!sort) sort = '-createdAt';
  let order = null;
  // Literal query
  if (typeof sort === 'object') order = sort;
  else order = [[sort.replace('-', ''), sort.startsWith('-') ? 'DESC' : 'ASC']];
  let items = await model.findAll({
    where: filter,
    ...(order && { order }),
    limit,
    offset,
    include,
    subQuery: false,
    nest: true,
    raw: true,
    logging: true,
    ...(attributes && { attributes })
  });
  return {
    pageInfo: {
      totalCount,
      totalPages,
      page,
      limit,
      hasNext
    },
    items: <any>items
  };
};
