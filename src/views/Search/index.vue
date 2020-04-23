<template>
  <div class="page-search">
    <header class="search-header">
      <div class="header-back"></div>
      <div class="header-search">
        <span class="icon-search"></span>
        <input
          class="search-input font-24"
          type="search"
          placeholder="漫画名丨作者 ^_^"
          v-model="searchVal"
        />
      </div>
      <div class="header-btn font-30" @click="handleClick(searchVal)">搜索</div>
    </header>

    <div class="search-main">
      <template v-if="!searchVal">
        <!-- 热门搜索 begin -->
        <section class="search-recommend">
          <div class="title font-26">
            <span class="title-title">大家都在搜</span>
            <span class="title-btn" @click="getHotSearch">
              <span class="icon-refresh"></span>刷新
            </span>
          </div>

          <div class="recommend-content font-28">
            <span
              class="recommend-item"
              v-for="item in hotWordsList"
              :key="item.id"
              @click="handleClick(item.keyword)"
            >{{ item.keyword }}</span>
          </div>
        </section>
        <!-- 热门搜索 end -->

        <!-- 最近搜索 begin -->
        <section class="search-history" v-if="historySearchList.length > 0">
          <div class="title font-26">
            <span class="title-title">最近搜索</span>
            <span class="title-btn">
              <span class="icon-del"></span>
            </span>
          </div>
          <div class="history-content font-28">
            <span
              class="history-item"
              v-for="item in historySearchList"
              :key="item"
              @click="handleClick(item)"
            >
              <span class="icon-time"></span>
              {{ item }}
            </span>
          </div>
        </section>
        <!-- 最近搜索 end -->
      </template>

      <template v-else>
        <!-- 搜索结果面板 begin -->
        <section class="search-content">
          <p
            class="item font-28"
            v-for="item in searchIndexList"
            :key="item"
            @click="handleClick(item)"
          >{{ item }}</p>
        </section>
        <!-- 搜索结果面板 end -->
      </template>
    </div>
  </div>
</template>

<script>
import { getHotSearch, searchIndex } from '@/api/cartoon'
export default {
  name: 'Search',

  data () {
    return {
      searchVal: '',

      // 热门搜索关键字列表
      hotWordsList: [],

      // 搜索面板数据集合
      searchIndexList: [],

      // 历史搜索记录列表
      historySearchList: this.getSearch()
    }
  },

  watch: {
    searchVal (newVal, oldVal) {
      // 判断newVal是否有值
      // ？思考？ 只要 searchVal 发生变化，就发生ajax请求
      // 先输入 z
      // 在输入 h
      // 先后发了两个请求 一个是  z 一个是 zh
      // ajax请求的响应顺序我们是控制不了的，就有可能出现，我需要展示在页面上的是 zh 的结果
      // 但是显示的是  z 的结果

      if (newVal) {
        // 防抖
        // 清除计时器
        clearTimeout(this.timer)

        this.timer = setTimeout(() => {
          this.searchIndex(newVal)
        }, 500)
      }
    }
  },

  methods: {
    getHotSearch () {
      getHotSearch().then(res => {
        this.hotWordsList = res.info.hotWordsList
      })
    },

    /**
     * 保存最近搜索
     * @param {String} keyword 搜索关键字
     */
    saveSearch (keyword) {
      // 取出之前存的内容
      let tmp = window.localStorage.getItem('search')
      // 判断tmp是否存在
      if (!tmp) {
        tmp = []
      } else {
        tmp = JSON.parse(tmp)
      }
      // 判断 keyword 是否已经在tmp中存在
      if (tmp.includes(keyword)) {
        return
      }
      // 将 keyword 追加到 tmp 数组中
      tmp.push(keyword)
      // 再将 tmp 存储
      window.localStorage.setItem('search', JSON.stringify(tmp))
    },

    /**
     * 取出最近搜索
     */

    getSearch () {
      const tmp = window.localStorage.getItem('search')
      if (!tmp) {
        return []
      } else {
        return JSON.parse(tmp)
      }
    },

    /**
     * 关键字点击
     */
    handleClick (keyword) {
      // 保存
      this.saveSearch(keyword)
      // 跳转到搜索结果页面
      // this.$router.push(`/search-result?keyword=${keyword}`)
      this.$router.push({
        path: '/search-result',
        query: {
          keyword
        }
      })
    },

    /**
     * 输入框输入内容时处理
     */
    searchIndex (name) {
      searchIndex(name).then(res => {
        this.searchIndexList = res.info
      })
    }
  },

  created () {
    this.getHotSearch()
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/mixins.scss";

.page-search {
  display: flex;
  flex-direction: column;
  height: 100%;

  .search-header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 44px;
    background: #e7370c;
    position: relative;
    border-bottom: 1px solid #dbd9dc;
    .header-back {
      position: absolute;
      top: 50%;
      left: 12px;
      margin-top: -7px;
      width: 24px;
      height: 14px;
      background: url("~@/assets/icon/header-back-white.png") no-repeat;
      background-size: 100%;
    }
    .header-btn {
      color: #fff;
      font-weight: 500;
      position: absolute;
      top: 50%;
      right: 12px;
      transform: translateY(-50%);
    }
    .header-search {
      display: flex;
      align-items: center;
      width: 70%;
      border-radius: 3px;
      position: relative;
      .icon-search {
        width: 14px;
        height: 14px;
        background: url("~@/assets/icon/icon-search.png") no-repeat;
        background-size: 100%;
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
      }
      .search-input {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        width: 100%;
        height: 30px;
        padding-right: 10px;
        padding-left: 30px;
        border-radius: 3px;
        outline: none;
        border: none;
      }
    }
  }

  .search-main {
    flex: 1;
    overflow-y: auto;
  }

  .search-recommend,
  .search-history {
    box-sizing: border-box;
    padding: 15px 0;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px 10px;
      border-bottom: 1px solid #e9e9e9;
      .title-title {
        color: #8b8b8b;
      }
      .title-btn {
        display: flex;
        align-items: center;
        color: #8b8b8b;
        .icon-refresh {
          width: 13px;
          height: 12px;
          margin-right: 4px;
          background: url("~@/assets/icon/icon-refresh.png") no-repeat;
          background-size: 100%;
        }
        .icon-del {
          width: 13px;
          height: 14px;
          background: url("~@/assets/icon/icon-del.png") no-repeat;
          background-size: 100%;
        }
      }
    }
    .recommend-content {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding: 0 10px;
      margin-top: 15px;
      .recommend-item {
        @include border(#ddd, 20px);
        display: flex;
        box-sizing: border-box;
        justify-content: center;
        align-items: center;
        height: 32px;
        padding: 0 10px;
        margin-right: 10px;
        margin-bottom: 10px;
        font-weight: 500;
      }
    }
    .history-content {
      padding: 0 10px;
      .history-item {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        width: 100%;
        height: 40px;
        border-bottom: 1px solid #e9e9e9;
        .icon-time {
          width: 13px;
          height: 13px;
          margin-right: 6px;
          background: url("~@/assets/icon/icon-time.png") no-repeat;
          background-size: 100%;
        }
      }
    }
  }

  .search-content {
    box-sizing: border-box;
    margin: 0 auto;
    padding: 0 10px;
    .item {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      height: 40px;
      padding-left: 10px;
      font-weight: 600;
      border-bottom: 1px solid #ddd;
    }
  }
}
</style>
