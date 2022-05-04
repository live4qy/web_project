/*
 * @Author: your name
 * @Date: 2022-03-01 10:20:06
 * @LastEditTime: 2022-03-22 17:39:36
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Blog_admin\src\api\article.js
 */
import request from '@/utils/request'

// 获取文章列表
export function fetchList(query) {
  return request({
    url: `/blogServer/article/fetchList`,
    method: `get`,
    params: query
  })
}

// 获取特定文章
export function fetchArticle(id) {
  return request({
    url: `/blogServer/article/fetchArticle`,
    method: `get`,
    params: { id }
  })
}

// 新建文章
export function createArticle(data) {
  return request({
    url: `/blogServer/article/create`,
    method: `post`,
    data
  })
}

// 更新文章
export function updateArticle(data) {
  return request({
    url: `/blogServer/article/update`,
    method: `post`,
    data
  })
}

// 发布或草稿文章
export function publishOrDraftArticle(data) {
  return request({
    url: `/blogServer/article/activateOrFreeze`,
    method: `post`,
    data
  })
}

// 删除文章
export function deleteArticle(id) {
  return request({
    url: `/blogServer/article/delete/${id}`,
    method: `delete`
  })
}
