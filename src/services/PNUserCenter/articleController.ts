// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** pageArticle POST /v1/usercenter/server/article/index/page */
export async function pageArticleUsingPost(
  body: API.ArticleIndexParam,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageArticleIndexVo_>('/v1/usercenter/server/article/index/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** read GET /v1/usercenter/server/article/index/read/${param0} */
export async function readUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.readUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseArticleVO_>(`/v1/usercenter/server/article/index/read/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** saveArticle POST /v1/usercenter/server/article/index/save */
export async function saveArticleUsingPost(
  body: API.ArticleSaveParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/v1/usercenter/server/article/index/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
