// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** listAllCatalogs GET /v1/usercenter/server/catalog/list/allCatalogs */
export async function listAllCatalogsUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListCatalogPaveVo_>(
    '/v1/usercenter/server/catalog/list/allCatalogs',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}
