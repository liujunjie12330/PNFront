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
