const cookieParser = process.server ? require('cookieparser') : undefined
export const state = () => ({
  user: null
})

export const mutations = {
  setUser (state, data) {
    state.user = data
  }
}

export const actions = {
  // nuxtServerInit 是一个特殊的action方法，只是在服务端渲染的时候调用
  // 作用是初始化数据传递给客户端使用
  nuxtServerInit ({ commit, state }, { req }) {
    let user = null 
    console.log(state.user)
    // 如果请求头中有 Cookie
    if(req.headers.cookie) {
      const parsed = cookieParser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {
      }
    }

    // 提交修改状态
    commit('setUser', user)
  },
}