<template>
  <div class="app-nav-bar">
    <div class="nav-content">
      <breadcrumb></breadcrumb>
      <div class="right-info">
        <user></user>
      </div>
    </div>
  </div>
</template>

<script>
  import Breadcrumb from 'components/layout/Breadcrumb'
  import User from 'components/layout/User'

  export default {
    name: 'NavBar',
    components: {
      Breadcrumb,
      User
    }
  }
</script>

<style scoped lang="scss" type="text/scss">
  @import "~assets/styles/index";

  .app-nav-bar{
    width: 100%;
    height: $navbar-height;
    background-color: $navbar-background;
    .nav-content{
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 10px;
      padding-right: 20px;
      .right-info{
        display: flex;
        align-items: center;
      }
    }
  }
</style>
