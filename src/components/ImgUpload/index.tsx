/* eslint-disable react/prop-types */
// 这是一个上传图片的组件，使用的是antd的Upload组件

import { FC } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import {uploadArticleImageUsingPost} from "@/services/PNUserCenter/fileController";




interface IProps {
  handleChange: (e: any) => void;
}

const ImgUpload: FC<IProps> = ({ handleChange}) => {
  const customCoverUpload = async (options: any) => {
    const { onSuccess, onProgress, onError, file } = options;
    console.log('上传图片', options);
    // 限制图片大小，不超过 5M
    if (file.size > 5 * 1024 * 1024) {
      onError('图片大小不能超过 5M');
      return;
    }
    //直接走文章的上传图片方法
    const res = await uploadArticleImageUsingPost({ file });
    if (res.code === 200) {
      handleChange(res.data)
      onSuccess(res.data);
    } else {
      onError(res.msg);
    }
  };

  return (
    <Upload
      customRequest={customCoverUpload}
      multiple={false}
      listType="picture"
      maxCount={1}
      accept="image/*"
      onRemove={() => {
        handleChange('');
      }}
      onChange={(info) => {
        // clear 的时候记得清空 cover
        // submit 的时候要判断 cover 是否为空，空的话提示用户上传
        const { status, name, response } = info.file;
        if (status !== 'uploading') {
          console.log('上传图片 onchange !uploading');
        }
        if (status === 'done') {
          message.success(`${name} 封面上传成功.`);
        } else if (status === 'error') {
          message.error(`封面上传失败，原因：${info.file.error}`);
        }
      }}
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  );
};
export default ImgUpload;
