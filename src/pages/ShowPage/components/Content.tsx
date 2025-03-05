import ReactMarkdown from 'react-markdown'; // 解析 markdown
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import remarkGemoji from 'remark-gemoji';
import remarkGfm from 'remark-gfm'; // markdown 对表格/删除线/脚注等的支持
import remarkMath from 'remark-math';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// 代码高亮主题风格
import ClipboardUtil from '@/emun/clipboardUtil';
import React, { useState } from 'react';
import { darcula, oneDark, prism, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './MdPreview.less';

// 主题枚举
export enum ThemeEnum {
  // @ts-ignore
  DEFAULT = prism,
  // @ts-ignore
  ONEDARK = oneDark,
  // @ts-ignore
  Darcula = darcula,
  // @ts-ignore
  VS = vs,
}

interface Props {
  content: string;
  theme?: ThemeEnum;
}

const Content: React.FC<Props> = ({ content, theme }) => {
  let index = 0;
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath, remarkGemoji]}
      rehypePlugins={[rehypeKatex, rehypeRaw]}
      components={{
        code({ children, className, inline }) {
          // 匹配否指定语言
          const match: any = /language-(\w+)/.exec(className || '');
          let [isShowCode, setIsShowCode] = useState(true);
          let [isShowCopy, setIsShowCopy] = useState(false);
          return (
            <>
              {!inline ? (
                <>
                  {/* 代码头部 */}
                  <div className="code-header">
                    <div
                      style={{ cursor: 'pointer', marginRight: '10px', transformOrigin: '8px' }}
                      className={isShowCode ? 'code-rotate-down' : 'code-rotate-right'}
                      onClick={() => setIsShowCode(!isShowCode)}
                    ></div>
                    <div>{match && match[1]}</div>
                    <div
                      className="preview-code-copy"
                      onClick={() => {
                        setIsShowCopy(true);
                        ClipboardUtil.writeText(String(children));
                        setTimeout(() => {
                          setIsShowCopy(false);
                        }, 1500);
                      }}
                    >
                      {isShowCopy && <span className="opacity-0-1-0 copy-success">复制成功</span>}
                    </div>
                  </div>
                  {isShowCode && (
                    <SyntaxHighlighter
                      showLineNumbers={true}
                      style={theme}
                      language={match && match[1]}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  )}
                </>
              ) : (
                <code className={className} style={inlineCodeStyle}>
                  {children}
                </code>
              )}
            </>
          );
        },
        h1({ children }) {
          return (
            <h1 id={'heading-' + ++index} className="heading">
              {children}
            </h1>
          );
        },
        h2({ children }) {
          return (
            <h2 id={'heading-' + ++index} className="heading">
              {children}
            </h2>
          );
        },
        h3({ children }) {
          return (
            <h3 id={'heading-' + ++index} className="heading">
              {children}
            </h3>
          );
        },
        h4({ children }) {
          return (
            <h4 id={'heading-' + ++index} className="heading">
              {children}
            </h4>
          );
        },
        h5({ children }) {
          return (
            <h5 id={'heading-' + ++index} className="heading">
              {children}
            </h5>
          );
        },
        h6({ children }) {
          return (
            <h6 id={'heading-' + ++index} className="heading">
              {children}
            </h6>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default Content;
