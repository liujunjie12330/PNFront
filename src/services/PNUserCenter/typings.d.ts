declare namespace API {
  type ArticleFootCountVo = {
    collectionCount?: number;
    commentCount?: number;
    praiseCount?: number;
    readCount?: number;
  };

  type ArticleIndexParam = {
    articleId?: number;
    catalogId?: number;
    columnId?: number;
    current?: number;
    search?: string;
    size?: number;
    tagId?: number;
    userId?: number;
  };

  type ArticleIndexVo = {
    articleFootCountVo?: ArticleFootCountVo;
    articleId?: number;
    authorAvatar?: string;
    authorId?: number;
    authorName?: string;
    catalogId?: number;
    catalogName?: string;
    columnId?: number;
    columnName?: number;
    cover?: string;
    creamStat?: number;
    current?: number;
    officalStat?: number;
    recommend?: number;
    shortTitle?: string;
    size?: number;
    summary?: string;
    tagVos?: TagVo[];
    title?: string;
    toppingStat?: number;
    updateTime?: string;
  };

  type ArticleSaveParams = {
    actionType?: string;
    articleId?: number;
    articleType?: number;
    categoryId?: number;
    columnId?: number;
    content?: string;
    cover?: string;
    payAmount?: string;
    payImageUrl?: string;
    payWay?: number;
    readType?: number;
    shortTitle?: string;
    source?: number;
    sourceUrl?: string;
    status?: number;
    summary?: string;
    tagIds?: number[];
    title?: string;
  };

  type ArticleVO = {
    articleId?: number;
    articleType?: number;
    authorInfo?: SimpleUserInfoDTO;
    catalog?: CatalogPaveVo;
    context?: string;
    countVo?: ArticleFootCountVo;
    cover?: string;
    officalStat?: number;
    paid?: boolean;
    payImageUrl?: string;
    recommend?: number;
    shortTitle?: string;
    source?: number;
    sourceUrl?: string;
    summary?: string;
    tags?: TagVo[];
    title?: string;
    url?: string;
  };

  type BaseResponseArticleVO_ = {
    code?: number;
    data?: ArticleVO;
    msg?: string;
  };

  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    msg?: string;
  };

  type BaseResponseListCatalogPaveVo_ = {
    code?: number;
    data?: CatalogPaveVo[];
    msg?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    msg?: string;
  };

  type BaseResponsePageArticleIndexVo_ = {
    code?: number;
    data?: PageArticleIndexVo_;
    msg?: string;
  };

  type BaseResponsePageTagVo_ = {
    code?: number;
    data?: PageTagVo_;
    msg?: string;
  };

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

  type CatalogPaveVo = {
    categoryId?: number;
    categoryName?: string;
    crateUserId?: number;
    crateUsername?: string;
    createAt?: string;
    rank?: number;
    status?: number;
    updateAt?: string;
    updateUserId?: number;
    updateUsername?: string;
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

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageArticleIndexVo_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: ArticleIndexVo[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageTagVo_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: TagVo[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type readUsingGETParams = {
    /** id */
    id: number;
  };

  type SimpleUserInfoDTO = {
    avatar?: string;
    name?: string;
    profile?: string;
    userId?: number;
  };

  type TagParam = {
    action?: string;
    articleId?: number;
    current?: number;
    size?: number;
    status?: number;
    tagId?: number;
    tagName?: string;
  };

  type TagVo = {
    crateUserId?: number;
    crateUsername?: string;
    createAt?: string;
    status?: number;
    tagId?: number;
    tagName?: string;
    tagType?: number;
    updateAt?: string;
    updateUserId?: number;
    updateUsername?: string;
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
