<template>
  <div class="page-home">
    <!-- 首页头部 begin -->
    <header class="index-header">
      <a href="mine.html?cpid=0">
        <div class="header-user">
          <div class="user-btn"></div>
        </div>
      </a>
      <div class="header-logo"></div>
      <a href="search.html?cpid=0">
        <div class="header-search"></div>
      </a>
    </header>
    <!-- 首页头部 end -->

    <Swiper class="my-swiper" @change="onChange" v-if="bannerList.length > 0">
      <SwiperItem v-for="item in bannerList" :key="item.id">
        <img :src="item.imageurl" alt />
      </SwiperItem>
    </Swiper>
  </div>
</template>

<script>
// 使用 ../相对路径时，如果当前组件位置发生变化，
// 那么相对路径也需要去修改，如果使用 @ 别名的方式。就不需要去修改这个路径了
// import Swiper from '@/components/Swiper/Swiper.vue'
// import SwiperItem from '@/components/Swiper/SwiperItem.vue'
// =>
import { Swiper, SwiperItem } from '@/components/Swiper'
import { getBanner } from '@/api/cartoon'
export default {
  name: 'Home',

  components: {
    Swiper,
    SwiperItem
  },

  data () {
    return {
      // 需要一个数据，考虑哪些点？
      // 1.数据放在哪里，data？ props？ computed？ state？ getter？
      // 2.数据格式，string? object? number? array? ....
      bannerList: []
    }
  },

  methods: {
    onChange (index) {
      console.log('hello', index)
    }
  },

  created () {
    getBanner()
      .then(res => {
        // 漫画岛项目每个接口都有 code 字段
        // 这个字段如何是200. 这个接口才是ok的
        if (res.code === 200) {
          // OK
          this.bannerList = res.info
        } else {
          // 不OK，就报错
          // TODO， 目前先使用丑陋的 alert 。 后面可以去用一下 vant 组件库中的组件
          alert(res.code_msg)
        }
      })
      .catch(err => {
        console.log(err)
        alert('网络异常，请稍后重试')
      })
  }
}
</script>

<style lang="scss" scoped>
// 引入公用的mixins.scss
// @import "../../assets/style/mixins.scss";
// 使用 @ 别名时，需要加一个 ~ 符号
// !!!! @vue/cli 4.3.1 不需要加 ~
@import "@/assets/style/mixins.scss";

.page-home {
  display: flex;
  flex-direction: column;
  height: 100%;

  .index-header {
    @include border-bottom;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 44px;
    box-sizing: content-box;
    .user-btn {
      width: 25px;
      height: 25px;
      background: url("../../assets/icon/user-btn.png") no-repeat;
      background-size: 100%;
    }
    .header-logo {
      width: 92px;
      height: 28px;
      background: url("../../assets/logo.png") no-repeat;
      background-size: 100%;
    }
    .header-search {
      width: 25px;
      height: 25px;
      background: url("../../assets/icon/search.png") no-repeat;
      background-size: 100%;
    }
  }

  .my-swiper img {
    width: 100%;
  }
}
</style>
