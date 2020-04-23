<template>
  <div class="page-search-result">
    <normal-header :title="keyword" :showRight="false"></normal-header>

    <div class="search-result-main">
      <cartoon-list :list="cartoonList"></cartoon-list>
    </div>
  </div>
</template>

<script>
import NormalHeader from '@/components/NormalHeader'
import CartoonList from '@/components/CartoonList'

import { getSearchResult } from '@/api/cartoon'
export default {
  name: 'SearchResult',

  components: {
    NormalHeader,
    CartoonList
  },

  data () {
    return {
      keyword: this.$route.query.keyword,

      list: []
    }
  },

  computed: {
    cartoonList () {
      return this.list.map(item => {
        return {
          id: item.id,
          coverurl: item.coverurl,
          name: item.name,
          author: item.author,
          view: item.lastpartname
        }
      })
    }
  },

  methods: {
    getSearchResult (name) {
      getSearchResult(name).then(res => {
        this.list = res.info
      })
    }
  },

  created () {
    this.getSearchResult(this.keyword)
  }
}
</script>

<style lang="scss" scoped>
.page-search-result {
  display: flex;
  flex-direction: column;
  height: 100%;

  .search-result-main {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
