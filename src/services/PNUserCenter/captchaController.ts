// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getCode GET /v1/usercenter/server/captcha/getCode/${param0} */
export async function getCodeUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCodeUsingGETParams,
  options?: { [key: string]: any },
) {
  const { username: param0, ...queryParams } = params;
  return request<API.BaseResponseString_>(`/v1/usercenter/server/captcha/getCode/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
