export default [
  {
    path: '/',
    title: '首页',
    icon: 'icon-home',
  }, {
    path: '/about',
    title: '关于我们',
    icon: 'icon-user',
  }, {
    path: '/about1',
    title: '关于我们1',
    icon: 'icon-user',
  }, {
    path: '/users',
    title: '用户管理',
    icon: 'icon-guanli',
    children: [
      {
        path: '/',
        title: '用户列表',
        icon: 'icon-home',
      }, {
        path: 'add',
        title: '添加用户',
        icon: 'icon-home',
      },
    ],
  },
];
