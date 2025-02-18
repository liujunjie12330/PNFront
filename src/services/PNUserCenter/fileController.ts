// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** uploadAvatar POST /v1/usercenter/server/picture/upload/avatar */
export async function uploadAvatarUsingPost(
  body: {},
  avatar?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (avatar) {
    formData.append('avatar', avatar);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<API.BaseResponseString_>('/v1/usercenter/server/picture/upload/avatar', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}
