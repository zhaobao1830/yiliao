<template>
  <div class="app-sidebar">
    <div class="logo">
      <img src="~assets/img/mobile-logo.png">
      <h1 v-show="!isCollapse">退役军人信访管理系统</h1>
    </div>
    <div class="app-sidebar-second">
      <el-menu class="el-menu-vertical-demo"
               ref="meun"
               :collapse="isCollapse"
               :default-active="defaultActive"
               background-color="#192A5E"
               text-color="rgba(196,201,210,1)"
               active-text-color="#1890ff">
        <template v-for="(item, index) in sideBarList">
          <el-submenu
            v-if="item.children"
            :key="'sidenav_' + index"
            :index="indexToString(index++)"
            popper-class="abc"
          >
            <template slot="title">
              <i :class="item.icon"/>
              <span slot="title">{{item.title}}</span>
            </template>
            <el-menu-item-group>
              <router-link
                v-for="(subItem, subIndex) in item.children"
                :to="subItem.path"
                :key="'sidenav_' + index + subIndex"
              >
                <el-menu-item
                  :index="index - 1 + '-' + indexToString(subIndex++)"
                  style="padding-left: 60px;">
                  {{subItem.title}}
                </el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item
            :index="indexToString(index++)"
             @click="goto(item.path)"
             v-else
             :key="item.path"
          >
            <i v-if="!filterIcon(item.icon)" :class="item.icon" ></i>
            <img v-else :src="item.icon" class="imgIcon" />
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'ylSideBar',
    props: ['isCollapse'],
    data () {
      return {
        arr: [],
        itemIndex: 0
      }
    },
    methods: {
      goto (path) {
        this.$router.push({
          path
        })
      },
      // 路由标记位
      indexToString (num) {
        this.itemIndex = num
        return num.toString()
      },
      filterIcon(icon) {
        return icon.indexOf('/') !== -1
      }
    },
    computed: {
      ...mapGetters([
        'sideBarList',
        'user',
        'auths',
        'defaultActive'
      ])
    }
  }
</script>

<style scoped lang="scss" type="text/scss">
  .app-sidebar{
    background: #192a5e;
    padding-right: 0px;
    .logo {
      width: $sidebar-width;
      height: 64px;
      display: flex;
      align-items: center;
      vertical-align: center;
      background-color: #122150;
      transition: all 0.5s linear;
      img {
        width: 32px;
        height: 32px;
        padding-left: 14px;
      }
      h1{
        margin: 0 0 0 12px;
        color: #fff;
        font-weight: 600;
        font-size: 18px;
        font-family: Avenir,Helvetica Neue,Arial,Helvetica,sans-serif;
        vertical-align: middle;
      }
    }
    .app-sidebar-second{
      width: $sidebar-width + 30px;
      position: absolute;
      top: 66px;
      left: 0;
      bottom: 0;
      padding-bottom: 20px;
      overflow-x: hidden;
      overflow-y: auto;
    }
    .imgIcon {
      width: 16px;
      height: 16px;
      margin-right: 10px;
      display: inline-block;
      transform: translateY(5px);
    }
    .iconfont {
      margin-right: 10px;
      color: $submenu-title;
      height: $menuItem-height;
    }
  }
</style>
