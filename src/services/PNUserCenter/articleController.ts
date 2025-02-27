// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** page POST /v1/usercenter/server/article/index/page */
export async function pageUsingPost(body: API.ArticleIndexParam, options?: { [key: string]: any }) {
  return request<API.BaseResponsePageArticleIndexVo_>('/v1/usercenter/server/article/index/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** save POST /v1/usercenter/server/article/index/save */
export async function saveUsingPost(body: API.ArticleSaveParams, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong_>('/v1/usercenter/server/article/index/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
