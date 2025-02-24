import * as path from "node:path";

export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  {
    path: '/welcome', name: '首页', icon: '', component: './HomePage'
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    routes: [
      { path: '/admin', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', name: '二级管理页', component: './Admin',
        // routes: [
        //   // 三级菜单
        //   {
        //     path: '/admin/sub-page/third-level',
        //     name: '三级管理页',
        //     component: './SpecialColumn'
        //   },
        // ],
      },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
