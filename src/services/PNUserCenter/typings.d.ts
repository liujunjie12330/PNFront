declare namespace API {
  type BaseResponseString_ = {
    code?: number;
    data?: string;
    msg?: string;
  };

  type BaseResponseUserVo_ = {
    code?: number;
    data?: UserVo;
    msg?: string;
  };

  type getCodeUsingGETParams = {
    /** username */
    username: string;
  };

  type loginUsingGETParams = {
    auth_code?: string;
    authorization_code?: string;
    code?: string;
    oauth_token?: string;
    oauth_verifier?: string;
    state?: string;
    /** resource */
    resource: string;
  };

  type UserLoginParams = {
    code?: string;
    password?: string;
    username?: string;
  };

  type UserRegisterParam = {
    checkPassword?: string;
    email?: string;
    fullName?: string;
    password?: string;
    phone?: string;
    username?: string;
  };

  type UserVo = {
    avatar?: string;
    email?: string;
    fullName?: string;
    id?: number;
    isAdmin?: number;
    lastLoginDate?: string;
    permissions?: string[];
    phone?: string;
    updateLastTime?: string;
    username?: string;
  };
}
