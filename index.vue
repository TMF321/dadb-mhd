<template>
  <div class="page-city">
    <normal-header :title="`当前城市-${curCityName}`" :showRight="false"></normal-header>

    <div class="city-main">
      <div class="left" ref="scrollLeft">
        <!-- .left 元素是 better-scroll 的容器，这个容器的第一个子元素才是内容 -->
        <div>
          <div
            class="city-index-section"
            :ref="`section-${item.py}`"
            v-for="item in cityList"
            :key="item.py"
          >
            <p>{{ item.py }}</p>
            <ul>
              <li
                v-for="city in item.list"
                :key="city.cityId"
                @click="handleClick(city)"
              >{{ city.name }}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="right">
        <ul>
          <li v-for="item in indexs" :key="item" @click="handleIndex(item)">{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import NormalHeader from '../../components/NormalHeader'
import { mapMutations, mapGetters, mapActions } from 'vuex'
import BScroll from 'better-scroll'

export default {
  name: 'City',

  components: {
    NormalHeader
  },

  computed: {
    ...mapGetters('city', ['curCityName', 'cityList', 'indexs'])
  },

  methods: {
    ...mapActions('city', ['GET_CITIES']),
    ...mapMutations('city', ['SET_CURCITY']),

    handleIndex (py) {
      // ref标记时，如果是标记在v-for上。那么得到的是一个数组
      // 根据py获取左侧对应的元素的dom对象
      // const targetEl = this.$refs[`section-${py}`][0]
      // 计算这个元素距离，左侧顶部的距离
      // const offsetTop = targetEl.offsetTop
      // 修改左侧滚动元素的 scrollTop 属性的值
      // this.$refs.scrollLeft.scrollTop = offsetTop
      const targetEl = this.$refs[`section-${py}`][0]
      const offsetTop = targetEl.offsetTop
      // 调用BScroll实例的 scrollTo 方法
      this.bscroll.scrollTo(0, -offsetTop)
    },

    handleClick (city) {
      // 改变仓库
      this.SET_CURCITY(city)
      // 回到之前要去的页面
      const redirect = this.$route.query.redirect || '/'
      this.$router.replace(redirect)
    }
  },

  created () {
    this.GET_CITIES()
  },

  mounted () {
    /* eslint-disable */
    this.bscroll = new BScroll(this.$refs.scrollLeft, {
      click: true
    });
    /* eslint-enable */
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/mixins.scss";

.page-city {
  display: flex;
  flex-direction: column;
  height: 100%;

  .city-main {
    flex: 1;
    display: flex;
    overflow: hidden;
  }

  .left {
    flex: 1;
    height: 100%;
    position: relative;
    .city-index-section {
      @include border-bottom;
      padding-left: 15px;
      p {
        @include border-bottom;
        height: 36px;
        line-height: 36px;
        font-size: 16px;
      }
      li {
        @include border-bottom;
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size: 16px;
      }
    }
  }

  .right {
    display: flex;
    align-items: center;
    width: 20px;
    height: 100%;

    li {
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      font-size: 14px;
    }
  }
}
</style>
