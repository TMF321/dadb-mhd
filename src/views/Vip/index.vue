<template>
  <div class="page-vip">
    <normal-header title="VIP专区"></normal-header>

    <header-type></header-type>

    <div class="vip-main">
      <cartoon-list></cartoon-list>
    </div>
  </div>
</template>

<script>
import NormalHeader from '@/components/NormalHeader'
import HeaderType from '@/components/HeaderType'
import CartoonList from '@/components/CartoonList'

export default {
  name: 'Vip',

  components: {
    NormalHeader,
    HeaderType,
    CartoonList
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
