<template>
  <div class="lin-line"
       :style="{ height: height + 'px',
       width: 'calc(100% + ' + addWidth + 'px'+ ')',
       marginLeft: - addWidth / 2 + 'px'}"></div>
</template>

<script>
  export default {
    name: 'base-1px',
    props: {
      height: {
        type: Number,
        default: 1
      },
      addWidth: {
        type: [String, Number],
        default: '0'
      }
    }
  }
</script>

<style scoped lang="scss" type="text/scss">
  .lin-line {
    height: 1px;
    width: 100%;
    background: #dae1ed;
    margin-bottom: 10px;
    box-shadow: 0 2px 5px #d4d4d4;
  }
</style>
