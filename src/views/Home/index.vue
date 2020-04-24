<template>
  <div class="page-home">
    <router-link to="/city">当前选择的城市是：{{ curCityName }}</router-link>

    <index-header></index-header>
    <div>
      <Swiper class="my-swiper" @change="onChange" v-if="bannerList.length > 0">
        <SwiperItem v-for="item in bannerList" :key="item.id">
          <img :src="item.imageurl" alt />
        </SwiperItem>
      </Swiper>

      <index-nav></index-nav>

      <index-recommend v-for="item in recommendList" :key="item.specialid" :info="item"></index-recommend>
    </div>
  </div>
</template>

<script>
// 使用 ../相对路径时，如果当前组件位置发生变化，
// 那么相对路径也需要去修改，如果使用 @ 别名的方式。就不需要去修改这个路径了
// import Swiper from '@/components/Swiper/Swiper.vue'
// import SwiperItem from '@/components/Swiper/SwiperItem.vue'
// =>
import { Swiper, SwiperItem } from '@/components/Swiper'
import IndexNav from './components/IndexNav'
import IndexRecommend from './components/IndexRecommend'
import IndexHeader from './components/IndexHeader'
import { getBanner, getIndexRecommend } from '@/api/cartoon'
import { mapGetters } from 'vuex'
export default {
  name: 'Home',

  components: {
    Swiper,
    SwiperItem,
    IndexNav,
    IndexRecommend,
    IndexHeader
  },

  data () {
    return {
      // 需要一个数据，考虑哪些点？
      // 1.数据放在哪里，data？ props？ computed？ state？ getter？
      // 2.数据格式，string? object? number? array? ....
      bannerList: [],

      recommendList: []
    }
  },

  computed: {
    ...mapGetters('city', ['curCityName'])
  },

  methods: {
    onChange (index) {
      console.log('hello', index)
    },

    getBanner () {
      getBanner()
        .then(res => {
          // 漫画岛项目每个接口都有 code 字段
          // 这个字段如何是200. 这个接口才是ok的
          // OK
          this.bannerList = res.info
        })
    },

    getIndexRecommend () {
      getIndexRecommend()
        .then(res => {
          this.recommendList = res.info
        })
    }
  },

  created () {
    this.getBanner()
    this.getIndexRecommend()
  }
}
</script>

<style lang="scss" scoped>
// 引入公用的mixins.scss
// @import "../../assets/style/mixins.scss";
// 使用 @ 别名时，需要加一个 ~ 符号
// !!!! @vue/cli 4.3.1 不需要加 ~
@import "@/assets/styles/mixins.scss";

.page-home {
  display: flex;
  flex-direction: column;
  height: 100%;

  .index-main {
    flex: 1;
    overflow-y: auto;
  }

  .my-swiper img {
    width: 100%;
  }
}
</style>
