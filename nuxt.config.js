module.exports = {
  router: {
    linkActiveClass: 'active',
    extendRoutes (routes, resolve) {
      // 重新定义routes
      routes.splice(0)
      routes.push(...[
        {
          path: '/',
          name: 'layout',
          component: resolve(__dirname, 'pages/layout/index.vue'),
          children: [
            {
              path: '',
              name: 'home',
              component: resolve(__dirname, 'pages/home/index.vue'),
            },
            {
              path: '/login',
              name: 'login',
              component: resolve(__dirname, 'pages/login/index.vue'),
            },
            {
              path: '/register',
              name: 'register',
              component: resolve(__dirname, 'pages/login/index.vue'),
            },
            {
              path: '/settings',
              name: 'settings',
              component: resolve(__dirname, 'pages/settings/index.vue'),
            },
            {
              path: '/editor',
              name: '/editor',
              component: resolve(__dirname, 'pages//editor/index.vue'),
            },
            {
              path: '/profile/:username',
              name: 'profile',
              component: resolve(__dirname, 'pages/profile/index.vue'),
            },
            {
              path: '/article/:slug',
              name: 'article',
              component: resolve(__dirname, 'pages/article/index.vue'),
            },
          ]
        }
      ])
    }
  },
  plugins: [
    '~/plugins/request.js',
    '~/plugins/day.js'
  ],
  server: {
    port: 3000,
    host: '0.0.0.0' // 对外访问
  }
}