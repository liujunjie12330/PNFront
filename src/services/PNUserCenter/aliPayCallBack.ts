// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** callback GET /v1/usercenter/server/callback/alipay/payOrOauth */
export async function callbackUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseString_>('/v1/usercenter/server/callback/alipay/payOrOauth', {
    method: 'GET',
    ...(options || {}),
  });
}

/** callback PUT /v1/usercenter/server/callback/alipay/payOrOauth */
export async function callbackUsingPut(options?: { [key: string]: any }) {
  return request<API.BaseResponseString_>('/v1/usercenter/server/callback/alipay/payOrOauth', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** callback POST /v1/usercenter/server/callback/alipay/payOrOauth */
export async function callbackUsingPost(options?: { [key: string]: any }) {
  return request<API.BaseResponseString_>('/v1/usercenter/server/callback/alipay/payOrOauth', {
    method: 'POST',
    ...(options || {}),
  });
}

/** callback DELETE /v1/usercenter/server/callback/alipay/payOrOauth */
export async function callbackUsingDelete(options?: { [key: string]: any }) {
  return request<API.BaseResponseString_>('/v1/usercenter/server/callback/alipay/payOrOauth', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** callback PATCH /v1/usercenter/server/callback/alipay/payOrOauth */
export async function callbackUsingPatch(options?: { [key: string]: any }) {
  return request<API.BaseResponseString_>('/v1/usercenter/server/callback/alipay/payOrOauth', {
    method: 'PATCH',
    ...(options || {}),
  });
}
