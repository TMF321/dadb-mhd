<template>
  <div class="page-vip">
    <normal-header title="VIP专区"></normal-header>

    <div class="vip-main">
      <cartoon-list :list="cartoonList"></cartoon-list>
    </div>
  </div>
</template>

<script>
import NormalHeader from '@/components/NormalHeader'
import CartoonList from '@/components/CartoonList'

import { getVIPList } from '@/api/cartoon'
import { unformat } from '@/utils/apiHeader'

export default {
  name: 'Vip',

  components: {
    NormalHeader,
    CartoonList
  },

  data () {
    return {
      VIPList: []
    }
  },

  computed: {
    cartoonList () {
      return this.VIPList.map(item => {
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
    getVIPList () {
      getVIPList().then(res => {
        const info = JSON.parse(unformat(res.info))
        this.VIPList = info.comicsList
      })
    }
  },

  created () {
    this.getVIPList()
  }
}
</script>

<style lang="scss" scoped>
.page-vip {
  display: flex;
  flex-direction: column;
  height: 100%;

  .vip-main {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
