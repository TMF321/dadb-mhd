<template>
  <div class="page-classify">
    <normal-header title="分类"></normal-header>

    <header-type :types="types" @click="onTypeChange"></header-type>

    <div class="classify-main">
      <cartoon-list :list="cartoonList"></cartoon-list>
    </div>
  </div>
</template>

<script>
import NormalHeader from '@/components/NormalHeader'
import HeaderType from '@/components/HeaderType'
import CartoonList from '@/components/CartoonList'

import { getTypes, getTypeList } from '@/api/cartoon'
import { unformat } from '../../utils/apiHeader'

export default {
  name: 'Classify',

  components: {
    NormalHeader,
    HeaderType,
    CartoonList
  },

  data () {
    return {
      types: [],

      classifyList: []
    }
  },

  computed: {
    cartoonList () {
      // [{bigbook_id, bigbook_name, }] => [{id, name}]
      return this.classifyList.map(item => {
        return {
          id: item.bigbook_id,
          coverurl: item.coverurl,
          name: item.bigbook_name,
          author: item.bigbook_author,
          view: item.bigbookview
        }
      })
    }
  },

  methods: {
    a () {
      return getTypes().then(res => {
        this.types = res.info
      })
    },

    b (subject) {
      getTypeList(subject).then(res => {
        // 对 res.info 做解密，并解析 JSON
        const info = JSON.parse(unformat(res.info))
        console.log(info)
        this.classifyList = info.comicsList
      })
    },

    /**
     * 切换分类类型时，触发
     */

    onTypeChange (payload) {
      console.log(payload)
      // 取出 payload 中的 type 中的 targetargument
      const subject = payload.type.targetargument
      // 从新发送 B 接口请求
      this.b(subject)
    }
  },

  async created () {
    // A B 两个接口，B 接口的参数需要从 A 接口的返回值中去获取。要如何办？
    await this.a()
    this.b(this.types[0].targetargument)
  }
}
</script>

<style lang="scss" scoped>
.page-classify {
  display: flex;
  flex-direction: column;
  height: 100%;

  .classify-main {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
