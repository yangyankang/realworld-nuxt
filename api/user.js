/* 用户相关api */
import { request } from '@/plugins/request'

// 用户登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data
  })
}

// 用户注册
export const register = data => {
  return request({
    method: 'POST',
    url: '/api/users',
    data
  })
}

// 获取当前用户
export const fetchCurrentUser = () => {
  return request({
    method: 'get',
    url: '/api/user',
  })
}

// 更新用户资料
export const updateUser = (data) => {
  return request({
    method: 'put',
    url: '/api/user',
    data
  })
}