<template>
  <section class="cartoon-list">
    <div class="list-item" v-for="(item, index) in list" :key="item.id">
      <div class="item-pic" :style="`background-image: url('${item.coverurl}')`"></div>
      <div class="item-info">
        <div class="info-book font-30">{{ item.name }}</div>
        <div class="info-author font-26">作者：{{ item.author }}</div>
        <div class="info-fans font-26">人气：{{ item.view }}</div>
      </div>
      <!--
        前三个 使用 item-ranking-下标 来做为类
        后面的 使用 item-ranking-other 来做为类
      -->
      <div
        v-show="isRanking"
        :class="`item-ranking-${index < 3 ? index + 1 : 'other'}`"
      >{{ index | filterA }}</div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CartoonList',

  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    },

    /**
     * 是否排名
     */
    isRanking: {
      type: Boolean,
      default: false
    }
  },

  filters: {
    filterA (value) {
      return value < 3 ? '' : value + 1
    }
  }
}
</script>

<style lang="scss" scoped>
.cartoon-list {
  .list-item {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    height: 124px;
    padding-left: 10px;
    border-bottom: 1px solid #dbd9dc;
    position: relative;
    .item-pic {
      flex-shrink: 0;
      width: 80px;
      height: 106px;
      border-radius: 3px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: top;
    }
    .item-info {
      flex: 1;
      margin-left: 10px;
      color: #999;
      overflow: hidden;
      .info-book,
      .info-author,
      .info-fans {
        font-weight: 500;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .info-book {
        color: #333;
      }
      .info-book,
      .info-author {
        margin-bottom: 10px;
      }
    }
    .item-ranking-1,
    .item-ranking-2,
    .item-ranking-3 {
      width: 50px;
      height: 28px;
      margin: auto;
      position: absolute;
      top: 0;
      right: 20px;
      bottom: 0;
    }
    .item-ranking-other {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 26px;
      height: 25px;
      font-size: 12px;
      color: #80808f;
      background: url("~@/assets/icon/item-rank-other.png") no-repeat;
      background-size: 100%;
      margin: auto;
      position: absolute;
      top: 0;
      right: 30px;
      bottom: 0;
    }
    .item-ranking-1 {
      background: url("~@/assets/icon/item-rank-1.png") no-repeat;
      background-size: 100%;
    }
    .item-ranking-2 {
      background: url("~@/assets/icon/item-rank-2.png") no-repeat;
      background-size: 100%;
    }
    .item-ranking-3 {
      background: url("~@/assets/icon/item-rank-3.png") no-repeat;
      background-size: 100%;
    }
  }
}
</style>
