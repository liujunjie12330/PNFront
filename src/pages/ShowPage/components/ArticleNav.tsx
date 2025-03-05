import React from "react";
import { Anchor } from "antd";
import useAnchors from "./useAnchors"; // 引入自定义钩子

export const ArticleNav: React.FC = () => {
  const anchorList = useAnchors();


  return (
    <Anchor
      items={anchorList}
      affix={true}
      // @ts-ignore
      getContainer={() => document.querySelector(".content-container")}
    />
  );
};

export default ArticleNav;
