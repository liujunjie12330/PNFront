import { Footer } from '@/components';
import { getCodeUsingGet } from '@/services/PNUserCenter/captchaController';
import { loginUsingPost } from '@/services/PNUserCenter/loginController';
import {
  GithubOutlined,
  GitlabOutlined,
  GoogleOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { LoginForm, ProForm, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, Helmet, history, SelectLang, useIntl, useModel } from '@umijs/max';
import { message, Tabs } from 'antd';
import { createStyles } from 'antd-style';
import { values } from 'lodash';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import Settings from '../../../../config/defaultSettings';

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});

const ActionIcons = () => {
  const { styles } = useStyles();

  return (
    <>
      <GithubOutlined
        key="AlipayCircleOutlined"
        onClick={async () => {
          window.location.assign('http://localhost:9999/v1/usercenter/server/user/login/byGithub');
        }}
        className={styles.action}
      />
      <GitlabOutlined
        key="TaobaoCircleOutlined"
        onClick={async () => {
          window.location.assign('http://localhost:9999/v1/usercenter/server/user/login/byGitlab');
        }}
        className={styles.action}
      />
      <GoogleOutlined
        key="WeiboCircleOutlined"
        onClick={async () => {
          window.location.assign('http://localhost:9999/v1/usercenter/server/user/login/byGitee');
        }}
        className={styles.action}
      />
    </>
  );
};

const Lang = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.lang} data-lang>
      {SelectLang && <SelectLang />}
    </div>
  );
};

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<string>('');
  const [form] = ProForm.useForm();
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const { styles } = useStyles();
  const intl = useIntl();
  //自定义变量
  const [image, setImage] = useState<string>(); //图片验证码
  //获取验证码
  const getCode = async () => {
    const username = form.getFieldValue('username');
    console.log(username);
    // 检查 username 是否存在且是字符串
    if (
      typeof username !== 'string' ||
      username === '' ||
      username.length < 4 ||
      username.length > 16
    ) {
      return null;
    }
    await getCodeUsingGet({
      ...values,
      username: username,
    } as API.getCodeUsingGETParams).then((res) => {
      setImage('data:image/png;base64,' + res.data);
    });
  };

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const msg = await loginUsingPost({ ...values });
      if (msg.code === 200) {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '登录成功！',
        });
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      }
      console.log(msg);
      // 如果失败去设置用户错误信息
      setUserLoginState('false');
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };
  //const { status, type: loginType } = userLoginState;

  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: 'menu.login',
            defaultMessage: '登录页',
          })}
          - {Settings.title}
        </title>
      </Helmet>
      <Lang />
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          form={form}
          logo={<img alt="logo" src="/logo.svg" />}
          title="Ant Design"
          subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
          initialValues={{
            autoLogin: true,
          }}
          actions={[
            <FormattedMessage
              key="loginWith"
              id="pages.login.loginWith"
              defaultMessage="其他登录方式"
            />,
            <ActionIcons key="icons" />,
          ]}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: intl.formatMessage({
                  id: 'pages.login.accountLogin.tab',
                  defaultMessage: '账户密码登录',
                }),
              },
            ]}
          />
          {type === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.username.placeholder',
                  defaultMessage: '用户名',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.username.required"
                        defaultMessage="请输入用户名!"
                      />
                    ),
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.password.placeholder',
                  defaultMessage: '密码',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.password.required"
                        defaultMessage="请输入密码！"
                      />
                    ),
                  },
                ]}
              />
              <ProFormText
                name="code"
                fieldProps={{
                  size: 'large',
                  prefix: <SafetyCertificateOutlined style={{ color: '#000000' }} />,
                  suffix: (
                    <img
                      style={{
                        width: '100%',
                        height: '25px',
                        verticalAlign: 'initial',
                        padding: '-1px 0px 0px 20px',
                      }}
                      src={image}
                      alt="图片走丢啦~"
                      onClick={getCode}
                    />
                  ),
                }}
                placeholder={'验证码'}
                rules={[
                  {
                    required: true,
                    message: '验证码是必填项！',
                  },
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 60,
            }}
          >
            <a
              style={{
                float: 'left',
              }}
            >
              <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" />
            </a>
            <a
              style={{
                float: 'right',
              }}
            >
              <FormattedMessage id="pages.login.forgotPassword" defaultMessage="没有账号?" />
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
