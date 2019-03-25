<template>
  <div class="lin-line"
       :style="{ height: height + 'px',
       width: 'calc(100% + ' + addWidth + 'px'+ ')',
       marginLeft: - addWidth / 2 + 'px', color: color }"></div>
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
      },
      color: {
        type: String,
        default: '#c4c0d2'
      }
    }
  }
</script>

<style scoped lang="scss" type="text/scss">

</style>
