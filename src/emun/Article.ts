import {darcula, oneDark, prism, vs} from "react-syntax-highlighter/dist/esm/styles/prism";

/**
 * 阅读类型
 */
export const ReadType = {
  NORMAL: { value: 0, label: '直接阅读' },
  LOGIN: { value: 1, label: '登录阅读' },
  TIME_READ: { value: 2, label: '限时阅读' },
  PAY_READ: { value: 3, label: '付费阅读' },
} as const;
/**
 * 文章操作
 */
export const ArticleSaveType = {
  POST: { value: 'POST', label: '发布' },
  SAVE: { value: 'SAVE', label: '暂存' },
  DELETE: { value: 'DELETE', label: '删除' },
} as const;

// 提供类型推导
export type ReadType = (typeof ReadType)[keyof typeof ReadType];
/**
 * 选择
 */
export const readTypeOptions = Object.values(ReadType).map((item) => ({
  label: item.label, // 显示文本
  value: item.value, // 值
}));

/**
 * 文章类型
 */
export const ArticleType = {
  EMPTY: { value: 0, label: '' },
  BLOG: { value: 1, label: '博文' },
  ANSWER: { value: 2, label: '问答' },
  COLUMN: { value: 3, label: '专栏文章' },
} as const;

type ArticleTypeType = typeof ArticleType[keyof typeof ArticleType];

// 定义前端枚举类型
export const SourceType = {
  EMPTY: { value: 0, label: '' },
  REPRINT: { value: 1, label: '转载' },
  ORIGINAL: { value: 2, label: '原创' },
  TRANSLATION: { value: 3, label: '翻译' },
} as const;

type SourceType = typeof SourceType[keyof typeof SourceType];
// 主题枚举
export enum ThemeEnum {
  DEFAULT = prism,
  ONEDARK = oneDark,
  Darcula = darcula,
  VS = vs,
}
