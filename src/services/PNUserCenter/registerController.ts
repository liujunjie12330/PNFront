// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** deletion POST /v1/usercenter/server/user/deletion */
export async function deletionUsingPost(
  body: API.UserRegisterParam,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseString_>('/v1/usercenter/server/user/deletion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** register POST /v1/usercenter/server/user/register */
export async function registerUsingPost(
  body: API.UserRegisterParam,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseString_>('/v1/usercenter/server/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
