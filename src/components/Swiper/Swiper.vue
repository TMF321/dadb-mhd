<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <!-- <div class="swiper-slide">slider1</div>
      <div class="swiper-slide">slider2</div>
      <div class="swiper-slide">slider3</div> -->

      <slot />
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.css'

export default {
  name: 'Swiper',

  props: {
    autoplay: {
      type: Number,
      default: 0
    },
    loop: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    const that = this

    /*eslint-disable */
    // this.$el 还可以使用 this.$ref.swiper
    new Swiper(this.$el, {
      pagination: {
        el: ".swiper-pagination"
      },

      loop: this.loop,

      autoplay: this.autoplay
        ? {
            delay: this.autoplay,
            stopOnLastSlide: false,
            disableOnInteraction: true
          }
        : false,

      on: {
        //这里不要使用箭头函数，否则里面的this指向指向的是当前的组件的实例。而不是想要的swiper实例
        slideChangeTransitionEnd: function() {
          //触发一个自定义事件change
          //   this.realIndex => this swiper实例
          // this.$emit() => this 当前组件实例

          that.$emit("change", this.realIndex);
        }
      }
    });
    /* eslint-enable */
  }
}
</script>

<style lang="scss">
.swiper-container {
  width: 100%;
  height: 180px;
  .swiper-pagination-bullet {
    opacity: 1;
    vertical-align: middle;
    width: 6x;
    height: 6px;
    margin: 0 5px;
    border-radius: 50%;
    background-color: hsla(0, 0%, 100%, 0.7);
  }
  .swiper-pagination-bullet-active {
    width: 20px;
    height: 20px;
    background: url("../../assets/icon/dot.png") no-repeat;
    background-size: 100%;
  }
}
</style>
