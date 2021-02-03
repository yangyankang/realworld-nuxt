/* 标签 */
import { request } from '@/plugins/request'


// 获取标签
export const getAllTags = (params) => {
  return request({
    url: '/api/tags',
    method: 'GET',
    params
  })
}