import ArticleNav from '@/pages/ShowPage/components/ArticleNav';
import Content, {ThemeEnum} from '@/pages/ShowPage/components/Content';
import React, {useEffect, useState} from 'react';
import {useParams} from "@@/exports";
import {readUsingGet} from "@/services/PNUserCenter/articleController";
import {err} from "pino-std-serializers";
import {message} from "antd";

const ShowPage: React.FC = () => {
  const{articleId} = useParams<{articleId:string}>();
  const [article, setArticle] = useState<API.ArticleVO>();
  useEffect(() => {
    const fetch =async ()=>{
       const res  =  await readUsingGet({id:Number(articleId)})
       if (res.code===200){
          setArticle(res.data);
         // 如果需要跳转，可以检查返回的数据
         if (res.data && res.data.needTpPay && res.data.url) {
           // 如果是付费内容，跳转到指定的URL
           window.location.href = res.data.url; // 或者使用 history.push(res.data.url);
         }
       } else {
         message.error(res.msg);
       }
    }
    fetch();
    console.log("article======>",article);
  }, []);

  return (
    <div

      style={{
        height: '60vh',
        display: 'flex',
        flexDirection: 'row', // 保证左右排布
      }}
    >
      <div
        style={{
          height: '50vh',
          width: '20%',
        }}
      >
        <ArticleNav />
      </div>
      <div
        className={'content-container'}
        style={{
          flex: 1, // 确保内容区域扩展，适应剩余空间
          display: 'flex',
          padding: '20px', // 可根据需要添加内边距
          scrollPaddingTop: '80px', // 设置跳转内容的顶部间距，避免被导航遮挡
          overflowY: 'auto', // 确保内容可以滚动
        }}
      >
        <Content content={article?.context?article.context:""} theme={ThemeEnum.VS}/>
      </div>
    </div>
  );
};
export default ShowPage;
