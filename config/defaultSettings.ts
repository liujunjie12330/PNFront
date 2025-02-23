import { ProLayoutProps } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: "light",
  colorPrimary: "#1890ff",
  layout: "top",
  contentWidth: "Fluid",
  fixedHeader: false,
  fixSiderbar: false,
  pwa: true,
  title:'编程导航',
  logo: "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
  token: {},
  splitMenus: false,
  footerRender:false
}

export default Settings;
