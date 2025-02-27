// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** pageTag POST /v1/usercenter/server/tag/page */
export async function pageTagUsingPost(body: API.TagParam, options?: { [key: string]: any }) {
  return request<API.BaseResponsePageTagVo_>('/v1/usercenter/server/tag/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
