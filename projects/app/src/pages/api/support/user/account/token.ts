import type { ApiRequestProps, ApiResponseType } from '@fastgpt/service/type/next';
import { NextAPI } from '@/service/middleware/entry';
import { authCert } from '@fastgpt/service/support/permission/auth/common';

export type GetTokenQuery = {};
export type GetTokenBody = {};
export type GetTokenResponse = {
  token: string;
};

async function handler(
  req: ApiRequestProps<GetTokenBody, GetTokenQuery>,
  res: ApiResponseType<GetTokenResponse>
) {
  // 验证用户身份
  const { userId, teamId, tmbId } = await authCert({
    req,
    authToken: true
  });

  // 从 cookie 中获取 token
  const token = req.cookies.fastgpt_token;

  if (!token) {
    return Promise.reject('Token not found');
  }

  return {
    token
  };
}

export default NextAPI(handler);
