import { Editor } from '@bytemd/react';
import 'bytemd/dist/index.min.css';
import 'highlight.js/styles/vs.css';
import React, { useEffect, useState } from 'react';

// 编辑器插件
import gemoji from '@bytemd/plugin-gemoji';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight-ssr';
import mediumZoom from '@bytemd/plugin-medium-zoom';
// @ts-ignore
import zhHans from 'bytemd/lib/locales/zh_Hans.json';

// 引入自定义的 CSS 样式
import ImgUpload from '@/components/ImgUpload';
import { ContentInterWrap, ContentWrap } from '@/components/common-wrap';
import DebounceSelect from '@/components/debounceselect';
import {
  ArticleSaveType,
  ArticleType,
  ReadType,
  readTypeOptions,
  SourceType,
} from '@/emun/Article';
import { saveArticleUsingPost } from '@/services/PNUserCenter/articleController';
import { listAllCatalogsUsingGet } from '@/services/PNUserCenter/catalogController';
import { uploadArticleImageUsingPost } from '@/services/PNUserCenter/fileController';
import { MapItem } from '@/typings/common';
import {
  AlipayOutlined,
  DoubleLeftOutlined,
  PayCircleOutlined,
  WechatOutlined,
} from '@ant-design/icons';
import math from '@bytemd/plugin-math';
import { useNavigate } from '@umijs/max';
import { Button, Drawer, Form, Input, message, Radio, Space, Tag } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import './index.scss';

// 插件配置
const plugins = [gfm(), highlight(), gemoji(), math(), mediumZoom()];

const defaultInitForm: API.ArticleSaveParams = {
  articleType: ArticleType.BLOG.value,
  source: SourceType.ORIGINAL.value,
  payAmount:0.99+''
};

const WritePage: React.FC = () => {
  const [content, setContent] = useState('');
  const [article, setArticle] = useState<API.ArticleSaveParams>(defaultInitForm);
  const [post, setPost] = useState<boolean>(true);
  const [isOpenDrawerShow, setIsOpenDrawerShow] = useState<boolean>(false);
  const [options, setOptions] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCatalogs = async () => {
      const res = await listAllCatalogsUsingGet();
      if (res.code === 200 && res.data) {
        const ops = res.data.map((item: any) => ({
          label: item.categoryName, // 显示文本
          value: item.categoryId, // 选项的值
        }));
        // console.log("options===>",ops);
        setOptions(ops);
      }
    };
    fetchCatalogs();
  }, []);

  const handleChange = (item: MapItem) => {
    setArticle({ ...article, ...item });
  };

  const handleCoverChange = (item: string) => {
    setArticle({ ...article, cover: item });
  };

  const handlePayImage = (item: string) => {
    setArticle({ ...article, payImageUrl: item });
  };
  const handleSubmit = async (form: API.ArticleSaveParams) => {
    if (post) {
      alert(post);
      setArticle({ ...article, actionType: ArticleSaveType.POST.value });
    } else {
      setArticle({ ...article, actionType: ArticleSaveType.SAVE.value });
    }
    const res = await saveArticleUsingPost(article);
    if (res.code === 200) {
      message.success(res.msg);
    }
  };

  // 标题、分类、标签、封面、简介
  const drawerContent = (
    <Form labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} autoComplete="off">
      <Form.Item
        label="简介"
        tooltip={'至少10个字'}
        name="summary"
        rules={[{ required: true, message: '请输入简介!' }]}
      >
        <TextArea
          allowClear
          // 行数
          rows={4}
          onChange={(e) => {
            handleChange({ ...article, summary: e.target.value });
          }}
        />
      </Form.Item>
      <Form.Item rules={[{ required: true, message: '请上传封面!' }]} label="封面" name="cover">
        <ImgUpload handleChange={handleCoverChange} />
      </Form.Item>
      <Form.Item
        name="catalogId"
        label="分类"
        rules={[{ required: true, message: '请选择一个分类' }]}
      >
        <Radio.Group
          className="custom-radio-group"
          optionType="button"
          buttonStyle="solid"
          options={options}
          onChange={(e) => {
            setArticle({ ...article, categoryId: e.target.value });
          }}
        />
      </Form.Item>
      <Form.Item label="标签" name="tagIds" rules={[{ required: true, message: '请选择标签!' }]}>
        {/*用下拉框做一个教程的选择 */}
        <DebounceSelect
          onChange={
            //@ts-ignore
            (selectedValues) => {
              console.log('选中的值:', selectedValues);
              // @ts-ignore
              const keys = selectedValues.map((item) => Number(item.key));
              console.log('keysString', keys);
              handleChange({ ...article, tagIds: keys });
            }
          }
        />
      </Form.Item>
      <Form.Item
        label="阅读类型"
        name="readType"
        rules={[{ required: true, message: '请选择阅读类型!' }]}
      >
        <Radio.Group
          className="custom-radio-group"
          optionType="button"
          buttonStyle="solid"
          options={readTypeOptions}
          onChange={(e) => {
            console.log('readTypeOptions', e.target.value);
            setArticle({ ...article, readType: e.target.value });
          }}
        />
      </Form.Item>
      <Form.Item label="打赏收款码" name="payImageUrl">
        <ImgUpload handleChange={handlePayImage} />
      </Form.Item>
      {article?.readType === ReadType.PAY_READ.value ? (
        <Form.Item
          label="支付类型"
          name="payway"
          rules={[{ required: true, message: '请选择支付类型!' }]}
        >
          <Radio.Group
            className="custom-radio-group"
            optionType="button"
            buttonStyle="solid"
            options={[
              { label: <AlipayOutlined />, value: '2' },
              { label: <WechatOutlined />, value: '3' },
            ]}
            onChange={(e) => {
              console.log('readTypeOptions', e.target.value);
              setArticle({ ...article, payWay: e.target.value });
            }}
          />
        </Form.Item>
      ) : null}
      {article?.readType === ReadType.PAY_READ.value ? (
        <Form.Item
          label="支付金额"
          name="payway"
          rules={[
            { required: true, message: '请选择支付类型!' },
            { max: 5, message: '金额数量过长' },
          ]}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40%',
            }}
          >
            <Input
              prefix={<PayCircleOutlined />}
              suffix="RMB"
              defaultValue={'0.99'}
              onChange={(e) => {
                console.log('readTypeOptions', e.target.value);
                // @ts-ignore
                if (e.target.value)
                setArticle({ ...article, payAmount: e.target.value });
              }}
            />
          </div>
        </Form.Item>
      ) : null}
    </Form>
  );

  return (
    <div className="page-wrap">
      {/* 顶部导航栏 */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Tag style={{ width: '75px' }}>
          <DoubleLeftOutlined
            onClick={() => {
              navigate(-1);
            }}
          />
          点击返回
        </Tag>
      </div>
      <div className="header" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <input
          type="text"
          placeholder="输入标题"
          style={{
            width: '90%',
            padding: '10px',
            border: '1px solid #ccc',
          }}
          onChange={(e) => {
            setArticle({ ...article, title: e.target.value });
          }}
        />
        <div className="save" style={{ padding: '2px', marginRight: '10' }}>
          <Button
            color="cyan"
            variant="solid"
            disabled={
              !(
                article != null &&
                article.title != null &&
                article.title != '' &&
                article.title.length > 6
              )
            }
            onClick={() => setIsOpenDrawerShow(true)}
          >
            保存
          </Button>
        </div>
      </div>

      {/* 编辑器容器 */}
      <div className="ArticleEdit">
        <ContentWrap>
          <ContentInterWrap>
            <Editor
              value={content}
              plugins={plugins}
              locale={zhHans}
              onChange={(v) => {
                // 右侧的预览更新
                console.log(v);
                setContent(v);
                handleChange({ ...article, content: v });
              }}
              //@ts-ignore
              uploadImages={(files) => {
                return Promise.all(
                  files.map(async (file) => {
                    console.log('file====>', file);
                    if (file.size > 5 * 1024 * 1024) {
                      return {
                        url: '图片不能超过5MB',
                      };
                    }
                    const res = await uploadArticleImageUsingPost({ file });
                    if (res.code === 200) {
                      return {
                        url: res.data,
                      };
                    }
                    return {
                      url: res.msg,
                    };
                  }),
                );
              }}
            />
          </ContentInterWrap>
        </ContentWrap>
      </div>
      {/* 保存或者更新时打开的抽屉 */}
      <Drawer
        title={article?.articleId ? '更新文章' : '保存文章'}
        placement="right"
        width={600}
        open={isOpenDrawerShow}
        onClose={() => {
          setIsOpenDrawerShow(false);
        }}
        extra={
          <Space>
            <Button onClick={() => setArticle(defaultInitForm)}>重置</Button>
            {/*@ts-ignore*/}
            <Button
              type="primary"
              disabled={
                !(
                  article != null &&
                  article.summary != null &&
                  article.summary != '' &&
                  article.summary.length > 10
                )
              }
              //@ts-ignore
              onClick={handleSubmit}
            >
              {article?.articleId ? '确认更新' : '确认保存'}
            </Button>
            <Button
              type="primary"
              disabled={
                !(
                  article != null &&
                  article.summary != null &&
                  article.summary != '' &&
                  article.summary.length > 10
                )
              }
              onClick={() => {
                setPost(false);
                handleSubmit(article as API.ArticleSaveParams);
              }}
            >
              暂存
            </Button>
          </Space>
        }
      >
        {drawerContent}
      </Drawer>
    </div>
  );
};

export default WritePage;
