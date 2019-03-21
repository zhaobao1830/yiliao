<template>
  <div style="height: 100%">
    <el-container>
      <el-aside :width="sideBarWidth">
        <side-bar :isCollapse="isCollapse"></side-bar>
      </el-aside>
      <el-container class="el-container-right">
        <el-header>
          <div class="operate">
            <i class="iconfont icon-fold"
               :class="{rotate: foldState}"
               @click="changeSlidebarState"></i>
            <i class="iconfont icon-up"
               :class="{rotate: upState}"
               @click="changeReuseState"></i>
          </div>
        </el-header>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {
    SideBar
  } from 'components/layout'

  const navBarHeight = 66 // header高度
  const marginHeight = 20 // 历史记录栏与舞台的间距

  export default {
    name: 'Home',
    data () {
      return {
        isCollapse: false, // 左侧菜单栏是否折叠
        sideBarWidth: '170px' // 左侧菜单栏展开的宽度
      }
    },
    methods: {
      // 控制菜单折叠
      changeSlidebarState() {
        this.isCollapse = !this.isCollapse
        this.foldState = !this.foldState
      },
      // 控制历史记录折叠
      changeReuseState() {
        this.showReuseTab = !this.showReuseTab
        this.upState = !this.upState
        this.$refs.appMain.$el.style.minHeight = this.showReuseTab === false ? `${this.clientHeight - navBarHeight - marginHeight}px` : `${this.clientHeight - totalHeight}px`
        // 因为动画效果有延时，所以需要重新渲染scroll
        setTimeout(() => {
          this.$refs.scroll.refresh()
        }, 400)
      }
    },
    components: {
      SideBar
    }
  }
</script>

<style scoped>
  .el-container-right{
    padding-bottom: 20px;
  }
</style>
