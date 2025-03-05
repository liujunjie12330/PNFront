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

/** existAlipayUserInfo GET /v1/usercenter/server/userSetting/existAlipayUser */
export async function existAlipayUserInfoUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>('/v1/usercenter/server/userSetting/existAlipayUser', {
    method: 'GET',
    ...(options || {}),
  });
}
