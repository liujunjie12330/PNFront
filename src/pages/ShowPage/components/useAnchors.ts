import { useState, useEffect } from "react";

const useAnchors = () => {
  const [anchorList, setAnchorList] = useState<any[]>([]);

  useEffect(() => {
    const generateAnchorList = (hNodeList: Array<HTMLElement>) => {
      if (hNodeList.length === 0) return [];

      let anchorList: any[] = [];
      let index = 0;
      let currentAnchor: any = {};

      const transform = (item: HTMLElement) => {
        const anchor = createAnchor(item);
        if (anchorList.length === 0) {
          anchorList.push(anchor);
          currentAnchor = anchor;
          return;
        }

        if (anchor.level > currentAnchor.level) {
          currentAnchor.children = currentAnchor?.children ?? [];
          recursionFn(currentAnchor.children, anchor);
        } else {
          anchorList.push(anchor);
          currentAnchor = anchor;
        }
      };

      const recursionFn = (curChildren: any[], anchor: any) => {
        if (curChildren.length === 0 || curChildren[0].level === anchor.level) {
          curChildren.push(anchor);
        } else if (curChildren[0].level < anchor.level) {
          let lastIndex = curChildren.length - 1;
          curChildren[lastIndex].children = curChildren[lastIndex]?.children ?? [];
          recursionFn(curChildren[lastIndex].children, anchor);
        }
      };

      const createAnchor = (item: HTMLElement) => {
        const level = Number(item.nodeName.split("")[1]);
        let anchor: any = {
          key: "",
          href: "",
          title: "",
          level,
        };
        anchor.title = item.innerHTML;
        anchor.href = `#heading-${++index}`;
        anchor.key = anchor.href;
        return anchor;
      };

      for (let item of hNodeList) {
        transform(item);
      }

      return anchorList;
    };

    const hNodeList: any = document.querySelectorAll(".heading");
    setAnchorList(generateAnchorList(hNodeList));
  }, []);

  return anchorList;
};

export default useAnchors;
