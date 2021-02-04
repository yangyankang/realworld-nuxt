/* 用户资料api */
import { request } from '@/plugins/request'

// 用户登录
export const getProfile = (username) => {
  return request({
    method: 'GET',
    url: `/api/profiles/${username}`,
  })
}
