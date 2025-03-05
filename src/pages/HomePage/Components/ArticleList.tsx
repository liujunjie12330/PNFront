import { Avatar, Card, Divider, List, Skeleton, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
// @ts-ignore
import { pageArticleUsingPost } from '@/services/PNUserCenter/articleController';
import { EyeFilled, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';

const ArticleList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.ArticleIndexVo[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreData = async (values: API.ArticleIndexParam) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const res = await pageArticleUsingPost({
      ...values,
    });
    if (res.code === 200) {
      setLoading(false);
      //@ts-ignore
      setData((prevData) => [...prevData, ...res.data.records]);
      //@ts-ignore
      if (data.length + res.data.records.length >= res.data.total) {
        setHasMore(false);
      }
    }
  };

  useEffect(() => {
    loadMoreData({ current: 1, size: 10 }); // 初始化加载数据
  }, []);

  return (
    <div
      style={{
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={() => loadMoreData({ current: data.length / 10 + 1, size: 10 })}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollThreshold={0.9} // 设置滚动到90%时触发加载
        //@ts-ignore
        scrollableTarget={window} // 使用window使得整个页面都可以滚动
        hasMore={hasMore}
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.articleId}>
              <Card
                hoverable
                style={{ marginBottom: 16, width: '100%' }}
                extra={
                  item.officalStat === 0 ? null : (
                    <Tag style={{ fontSize: '15px', color: 'gold', fontWeight: 'lighter' }}>
                      官方
                    </Tag>
                  )
                }
                title={
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    {/* 是否推荐的标志 */}
                    {item.recommend===1 && (
                      <Tag color="success" style={{ marginRight: '8px' }}>
                        推荐
                      </Tag>
                    )}
                    {/* 标题居中 */}
                    <div style={{ flex: 1, textAlign: 'center' }}>{item.title}</div>
                  </div>
                }
                actions={[
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar src={item.authorAvatar} />
                      <div style={{ marginLeft: '8px' }}>{item.authorName}</div>
                      {/* 头像左边显示用户名 */}
                      <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>•</span>{' '}
                      {/* 加粗的点 */}
                      <Tag style={{ marginLeft: '10px', fontSize: '14px', color: '#888' }}>
                        {/*@ts-ignore*/}
                        {new Date(item.updateTime).toDateString()}
                      </Tag>
                    </div>
                    <div style={{ flex: 1, textAlign: 'center' }}>
                      <span>
                        <MessageOutlined />
                        {/*@ts-ignore*/}
                        &nbsp;0
                      </span>
                      <span style={{ marginLeft: 16 }}>
                        <EyeFilled />
                        {/*@ts-ignore*/}
                        &nbsp;0
                      </span>
                      <span style={{ marginLeft: 16 }}>
                        <LikeOutlined />
                        {/*@ts-ignore*/}
                        &nbsp;0
                      </span>
                    </div>
                    <div style={{ flex: 1, textAlign: 'right' }}></div>
                  </div>,
                ]}
              >
                <Card.Meta description={item.summary} />
              </Card>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};

export default ArticleList;
