import ArticleNav from '@/pages/ShowPage/components/ArticleNav';
import Content, {ThemeEnum} from '@/pages/ShowPage/components/Content';
import React, {useEffect} from 'react';

const ShowPage: React.FC = () => {
  const content="##  sssssssssssssss"
  useEffect(() => {
    const fetch =async ()=>{

    }
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
        <Content content={content} theme={ThemeEnum.VS}/>
      </div>
    </div>
  );
};
export default ShowPage;
