/** 
 * 验证未授权的中间件
 * */ 
export default  function ({ store, redirect }) {
  if (store.state.user) {
    return redirect('/')
  }
}