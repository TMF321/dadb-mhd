// 拆分出来的 城市相关的 仓库子模块
import { getCityList } from '@/api/city'

const city = window.sessionStorage.getItem('city')

const state = {
  // 当前选择的城市 { cityId: 1111, name: 北京 }
  curCity: city ? JSON.parse(city) : null,

  cities: []
}

const getters = {
  curCityName (state) {
    return state.curCity ? state.curCity.name : ''
  },

  cityList (state) {
    // 最终结果收集
    const result = []
    state.cities.forEach(item => {
      // 获取当前城市的首字母
      const py = item.pinyin.substr(0, 1).toUpperCase()

      // 判断 当前 py 是否已经在 result 中存在，如果存在这个 py 在 result 中的下标是多少呢？
      const index = result.findIndex(item => item.py === py)
      if (index > -1) {
        // 存在
        result[index].list.push(item)
      } else {
        // 不存在
        result.push({
          py,
          list: [item]
        })
      }
      // 1. [{ py: 'B', list: [北京-item] }]
      // 2. 保定 [{ py: 'B', list: [北京item] }, { py: 'B', list: [保定-item]}]
      // 想要 [{ py: 'B', list: [北京-item, 保定-item] }]
    })
    return result.sort((a, b) => {
      return a.py.charCodeAt() - b.py.charCodeAt()
    })
  },

  indexs (state, getters) {
    return getters.cityList.map(item => item.py)
  }
}

const mutations = {
  SET_CURCITY (state, payload) {
    // 修改仓库中的 curCity 数据
    state.curCity = payload
    // 做一下本地的存储
    window.sessionStorage.setItem('city', JSON.stringify(state.curCity))
  },

  SET_CITIES (state, payload) {
    state.cities = payload
  }
}

const actions = {
  GET_CITIES (context, payload) {
    getCityList()
      .then(res => {
        const data = res.data
        if (data.status === 0) {
          // this.cities = data.data.cities;
          // 要改变的是state的数据
          context.commit('SET_CITIES', data.data.cities)
        } else {
          alert(data.msg)
        }
      })
      .catch(err => {
        console.log(err)
        alert('网络异常，请稍后重试')
      })
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
