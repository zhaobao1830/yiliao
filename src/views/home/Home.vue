<template>
  <div style="height: 100%">
    <el-container>
      <el-aside :width="sideBarWidth">
        <side-bar :isCollapse="isCollapse"
                  class="sidebar"></side-bar>
      </el-aside>
      <el-container class="el-container-right">
        <el-header>
          <div class="operate">
            <i class="iconfont icon-fold ccc"
               :class="{rotate: foldState}"
               @click="changeSlidebarState"></i>
            <i class="iconfont icon-up"
               :class="{rotate: upState}"
               @click="changeReuseState"></i>
            <nav-bar></nav-bar>
          </div>
        </el-header>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {
    NavBar,
    SideBar
  } from 'components/layout'
  import layoutMixin from 'lin/mixin/layout'
  import { mapGetters } from 'vuex'

  const navBarHeight = 66 // header高度
  const reuseTabHeight = 70 // 历史记录栏高度
  const marginHeight = 20 // 历史记录栏与舞台的间距
  const totalHeight = navBarHeight + reuseTabHeight + marginHeight

  export default {
    name: 'Home',
    data () {
      return {
        isCollapse: false, // 左侧菜单栏是否折叠
        sideBarWidth: '170px', // 左侧菜单栏展开的宽度
        foldState: false, // 控制左侧菜单栏按键
        upState: false // 控制历史记录栏按键
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
    mixins: [layoutMixin],
    computed: {
      ...mapGetters(['sideBarList'])
    },
    components: {
      NavBar,
      SideBar
    }
  }
</script>

<style scoped lang="scss" type="text/scss">
  @import "~assets/styles/index";

  .sidebar{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    overflow: hidden;
  }
  .el-container-right{
    padding-bottom: 20px;
    .operate{
      display: flex;
      align-items: center;
      background-color: $navbar-background;
      padding-left: 20px;
      .iconfont{
        font-weight: 500;
        color: #fff;
        cursor: pointer;
        transform: rotate(0deg);
        transition: all 0.3s linear;
        margin-right: 10px;
        &:hover {
          color: #3963bc;
        }
      }
    }
  }
</style>
