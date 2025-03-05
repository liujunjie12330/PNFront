// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** pay GET /v1/usercenter/server/alipay/pay */
export async function payUsingGet(options?: { [key: string]: any }) {
  return request<any>('/v1/usercenter/server/alipay/pay', {
    method: 'GET',
    ...(options || {}),
  });
}
