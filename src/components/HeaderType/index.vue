<template>
  <div class="header-type">
    <div
      class="item"
      :class="{'active': index === activeIndex}"
      v-for="(item, index) in types"
      :key="item.id"
      @click="handleClick(item, index)"
    >{{ item.description }}</div>
  </div>
</template>

<script>
export default {
  name: 'HeaderType',

  props: {
    types: {
      type: Array,
      default () {
        return []
      }
    }
  },

  data () {
    return {
      // 选中当前下标
      activeIndex: 0
    }
  },

  methods: {
    handleClick (type, index) {
      // 当前点击的高亮
      this.activeIndex = index
      // 通知父组件
      // payload 如何要传递多个参数，需要弄成对象形式
      this.$emit('click', { type, index })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixins.scss";

.header-type {
  @include border-bottom;
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0;
  .item {
    width: 20%;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    color: #000;
    &.active {
      color: #e7370c;
    }
  }
}
</style>
