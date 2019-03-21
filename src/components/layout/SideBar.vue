<template>
  <div class="app-sidebar">
    <div class="logo"
         v-if="!isCollapse">
      <img src="~assets/img/logo.png">
    </div>
    <div class="mobile-logo"
         v-else>
      <img src="~assets/img/mobile-logo.png">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SideBar',
    props: ['isCollapse']
  }
</script>

<style scoped lang="scss" type="text/scss">
  @import "~assets/styles/variable";
  .app-sidebar{
    background: #192a5e;
    padding-right: 0px;
    .logo {
      width: $sidebar-width;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 30px;
      color: #fff;
      transition: all 0.5s ease-in-out;
      background-color: #122150;

      img {
        width: 110px;
        height: 60px;
        padding: 3px 0px;
        transition: all 0.3s linear;
      }
    }
  }
</style>
