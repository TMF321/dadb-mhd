// 专门处理 漫画相关的 接口请求

// 引入封装好的 axios 的实例
import request from '@/utils/request'

/**
 * 获取轮播图
 */
export const getBanner = () => {
  // return 的是 接口调用之后， axios 返回的 Promise 对象
  return request({
    url: '/api/comic-v2/getproad',
    method: 'GET',
    // 需求请求体参数，就是提供 data
    // 需求查询字符串参数，就提供 params
    params: {
      apptype: 8,
      appversion: '1.0',
      channel: 'web-app',
      adgroupid: 123
    }
  })
}
