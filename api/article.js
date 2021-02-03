/* 文章相关 */
import { request } from '@/plugins/request'

// 获取所有文章
export const getAllArticles = (params) => {
  return request({
    url: '/api/articles',
    method: 'GET',
    params
  })
}

// 获取用户文章
export const getUserArticles = (params) => {
  return request({
    url: '/api/articles/feed',
    method: 'GET',
    params
  })
}

// 点赞
export const favoriteArticle = (slug) => {
  return request({
    url: `/api/articles/${slug}/favorite`,
    method: 'POST',
  })
} 

// 取消点赞
export const unfavoriteArticle = (slug) => {
  return request({
    url: `/api/articles/${slug}/favorite`,
    method: 'DELETE',
  })
} 

// 获取单个文章
export const fetchArticle = (slug) => {
  return request({
    url: `/api/articles/${slug}`,
    method: 'GET',
  })
} 

// 创建文章
export const createArticle = (data) => {
  return request({
    url: `/api/articles`,
    method: 'POST',
    data
  })
} 

// 修改文章
export const updateArticle = (data) => {
  return request({
    url: `/api/articles/${slug}`,
    method: 'POST',
    data
  })
} 

// 获取文章的评论
export const getArticleComments = (slug) => {
  return request({
    url: `/api/articles/${slug}/comments`,
    method: 'GET',
  })
} 