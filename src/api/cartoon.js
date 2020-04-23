// 专门处理 漫画相关的 接口请求

// 引入封装好的 axios 的实例
import request from '@/utils/request'

// 引入 ApiHeader
import { format } from '@/utils/apiHeader'

/**
 * 获取轮播图
 */
export const getBanner = () => {
  // return 的是 接口调用之后， axios 返回的 Promise 对象
  return request({
    url: '/api/comic_v2/getproad',
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

/**
 * 获取首页推荐数据
 */
export const getIndexRecommend = () => {
  // return 的是 接口调用之后， axios 返回的 Promise 对象
  return request({
    url: '/api/comic_v2/customerview',
    method: 'GET',
    // 需求请求体参数，就是提供 data
    // 需求查询字符串参数，就提供 params
    params: {
      apptype: 8,
      appversion: '1.0',
      channel: 'web-app',
      viewtype: 1
    }
  })
}

/**
 * 获取分类类型
 */
export const getTypes = () => {
  return request({
    url: '/api/comic_v2/getproad',
    method: 'GET',
    params: {
      apptype: 8,
      appversion: '1.0',
      channel: 'web-app',
      adgroupid: 125
    }
  })
}

/**
 * 获取分类数据
 * @param {String} subject 分类Id
 * @param {Number} pageno 当前页码
 * @param {Number} pagesize 每页显示条数
 */

export const getTypeList = (subject, pageno = 1, pagesize = 20) => {
  return request({
    url: '/api/comic_v2/comicsfilterlist_v2',
    method: 'POST',
    params: {
      apptype: 8,
      appversion: '1.0',
      channel: 'web-app'
    },

    data: format({
      subject,
      pageno,
      pagesize
    })
  })
}

/**
 * 获取排行榜数据
 */
export const getRankList = (ranktype, pageno = 1, pagesize = 20) => {
  return request({
    url: '/api/comic_v2/comicsrank',
    method: 'POST',
    params: {
      apptype: 8,
      appversion: '1.0',
      channel: 'web-app'
    },
    data: format({
      ranktype,
      pageno,
      pagesize
    })
  })
}

/**
 * 获取 VIP专区 数据
 */
export const getVIPList = () => {
  return request({
    url:
      '/api/comic_v2/comicsfilterlist_v2?apptype=8&appversion=1.0&channel=web-app',
    method: 'POST',
    data: format({
      pageno: 1,
      pagesize: 20,
      special: 892
    })
  })
}
