import React, { useEffect, useState } from 'react';
import { history, useParams } from '@umijs/max';
import { Button, Result } from 'antd';
import {isPaidUsingGet} from "@/services/PNUserCenter/articleController";

const Transfer: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();  // 获取路径参数 articleId
  const [loading, setLoading] = useState<boolean>(false);

  // 后端调用方法
  const callBackend = async () => {
      // @ts-ignore
    const res = await isPaidUsingGet({articleId:articleId});
      if (res.code===200 && res.data!=null && res.data) {
            history.push(`/article/detail/`+articleId);
      }
  };

  // 每分钟调用一次后端
  useEffect(() => {
    const interval = setInterval(() => {
      callBackend();
    }, 30000);  // 每 30秒调用一次

    // 页面被切回时调用一次
    callBackend();

    // 清除定时器
    return () => clearInterval(interval);
  }, [articleId]);

  return (
    <Result
      status="info"
      title="正在转移文章..."
      subTitle={`正在转移 ID 为 ${articleId} 的文章，请稍候...`}
      extra={
        <Button type="primary" onClick={callBackend} loading={loading}>
          点击刷新
        </Button>
      }
    />
  );
};

export default Transfer;
