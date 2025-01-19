// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** login GET /v1/usercenter/server/user/callback/login/${param0} */
export async function loginUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.loginUsingGETParams,
  options?: { [key: string]: any },
) {
  const { resource: param0, ...queryParams } = params;
  return request<API.BaseResponseString_>(`/v1/usercenter/server/user/callback/login/${param0}`, {
    method: 'GET',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** getCurrentUser GET /v1/usercenter/server/user/currentUser */
export async function getCurrentUserUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseUserVo_>('/v1/usercenter/server/user/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** loginByGitee GET /v1/usercenter/server/user/login/byGitee */
export async function loginByGiteeUsingGet(options?: { [key: string]: any }) {
  return request<any>('/v1/usercenter/server/user/login/byGitee', {
    method: 'GET',
    ...(options || {}),
  });
}

/** loginByGithub GET /v1/usercenter/server/user/login/byGithub */
export async function loginByGithubUsingGet(options?: { [key: string]: any }) {
  return request<any>('/v1/usercenter/server/user/login/byGithub', {
    method: 'GET',
    ...(options || {}),
  });
}

/** loginBylab GET /v1/usercenter/server/user/login/byGitlab */
export async function loginBylabUsingGet(options?: { [key: string]: any }) {
  return request<any>('/v1/usercenter/server/user/login/byGitlab', {
    method: 'GET',
    ...(options || {}),
  });
}

/** login POST /v1/usercenter/server/user/login/byUsername */
export async function loginUsingPost(body: API.UserLoginParams, options?: { [key: string]: any }) {
  return request<API.BaseResponseString_>('/v1/usercenter/server/user/login/byUsername', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
