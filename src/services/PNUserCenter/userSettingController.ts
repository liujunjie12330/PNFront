// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** bindAlipayAccount GET /v1/usercenter/server/userSetting/bindUserAlipay */
export async function bindAlipayAccountUsingGet(options?: { [key: string]: any }) {
  return request<any>('/v1/usercenter/server/userSetting/bindUserAlipay', {
    method: 'GET',
    ...(options || {}),
  });
}
