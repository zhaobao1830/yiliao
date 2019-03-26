<template>
  <section class="container">
    <div class="wrapper" id="wrapper">
      <transition name="fade-transform"
                  mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'AppMain'
  }
</script>

<style scoped lang="scss" type="text/scss">
  .container{
    .wrapper{
      width: 100%;
      height: 100%;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      background: #ffffff;
      text-align: left;
      overflow: hidden;
    }
  }
</style>
