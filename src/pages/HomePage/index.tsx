import { listAllCatalogsUsingGet } from '@/services/PNUserCenter/catalogController';
import {Button, Input, Layout, List} from 'antd';
import React, { useEffect, useState } from 'react';
import {CloseOutlined, SearchOutlined} from "@ant-design/icons";

const { Search } = Input;
const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#000000',
  height: 50,
  paddingInline: 48,
  lineHeight: '64px',
  fontSize: 16,
  backgroundColor: '#e6e612',
  display: 'flex', // Use flexbox for horizontal layout
  justifyContent: 'space-between', // Space between items
  alignItems: 'center', //
};

const headerArticleStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#000000',
  height: 350,
  paddingInline: 48,
  lineHeight: '64px',
  fontSize: 16,
  backgroundColor: '#d11111',
  display: 'flex', // Use flexbox for horizontal layout
  justifyContent: 'space-between', // Space between items
  alignItems: 'center', //
  border:'20px solid #ccc',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 128px)', // Ensuring content area takes the remaining space
  lineHeight: '120px',
  color: '#fff',
  marginRight: '3%',
  backgroundColor: '#0958d9',
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#1677ff',
};


const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  flex: 1, // Allow layout to take up available space
};

const HomePage: React.FC = () => {
  const [catalog, setCatalog] = useState<API.CatalogPaveVo[]>([]);
  const [searchVisible, setSearchVisible] = useState(false); // 控制搜索框显示
  useEffect(() => {
    // 调用 listAllCatalogsUsingGet 方法来获取数据
    listAllCatalogsUsingGet().then((response) => {
      if (response?.code === 200) {
        //@ts-ignore
        setCatalog(response.data); // 假设返回的 data 是一个数组
      }
    });
  }, []);

  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', height: '100vh', width: '100%' }}>
      <Layout style={{ ...layoutStyle, flex: '1 1 50%' }}>
        <Header style={headerStyle}>
          {!searchVisible ? (
            <div style={{ display: 'flex', gap: '100px' }}>
              <List
                grid={{ gutter: 500, column: 10 }} // 使用 grid 来进行横向展示
                dataSource={catalog}
                renderItem={(item) => (
                  <List.Item onClick={() => console.log(item)}>
                    <div style={{ fontWeight: 'bold', fontSize: 30, marginTop: 10 }}>
                      {item.categoryName}
                    </div>
                  </List.Item>
                )}
              />
            </div>
          ) : (
            <div style={{ marginLeft: '1', marginTop: 25,width:'100%' }}>
              <Search placeholder="input search text" enterButton="Search" size="large"  loading />
            </div>
          )
          }
          {!searchVisible?
            <Button shape="circle" icon={<SearchOutlined />} onClick={()=>setSearchVisible(true)}/>
            :
            <Button shape="circle" icon={<CloseOutlined />} onClick={()=>setSearchVisible(false)}/>
          }
        </Header>
        <Header style={headerArticleStyle}>asdhauivhsuiad</Header>
        <Layout style={{ minHeight: 'calc(100vh - 128px)' }}>
          <Content style={contentStyle}>Content</Content>
          <Sider width="20%" style={siderStyle}>
            Sider
          </Sider>
        </Layout>
      </Layout>
    </div>
  );
};

export default HomePage;
