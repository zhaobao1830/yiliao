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
        <template v-for="(ls, index) in sideBarList">
          <el-submenu v-if="ls.children && !ls.meta.menuTab"
                      :key="ls.path"
                      :index="indexToString(index++)"
                      popper-class="abc">
            <template slot="title">
              <img v-if="ls.meta.src"
                   :src="ls.meta.src"
                   class="imgIcon">
              <img v-else
                   :class="ls.meta.icon">
              <span slot="title">{{ls.meta.title}}</span>
            </template>
            <el-menu-item-group>
              <router-link v-for="(chi, chiIndex) in ls.children" :key="chiIndex">
                <el-menu-item :index="index - 1 + '-' + indexToString(chiIndex++)"
                              style="padding-left: 60px;">
                  {{chi.meta.title}}
                </el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item :index="indexToString(index++)"
                        @click="goto(ls.path)"
                        v-else
                        :key="ls.path">
            <img v-if="ls.meta.src"
                 :src="ls.meta.src"
                 class="imgIcon" />
            <i v-else
               :class="{[ls.meta.icon]: ls.meta.icon}"></i>
            <span slot="title">{{ls.meta.title}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import Utils from 'lin/utils/util'
  import homeRouter from '@/router/home-router'
  import routes from '@/router/routes'

  export default {
    name: 'SideBar',
    props: ['isCollapse'],
    data () {
      return {
        arr: [],
        itemIndex: 0
      }
    },
    created () {
      this.$nextTick(() => {
        this.filterSideBarList()
      })
    },
    methods: {
      goto (path) {
        this.$router.push({
          path
        })
      },
      // 筛选左侧菜单渲染数据
      filterSideBarList () {
        const filterRouter = [] // 根据用户权限，筛选用户能看到的菜单内容
        const homeRouterTwoLevel = Utils.deepClone(homeRouter) // 用来取二级菜单的数据
        const homeRouterThreeLevel = Utils.deepClone(homeRouter) // 用来取三级菜单的数据
        let hasOneLevelRouter = false // 是否添加过一级菜单
        let hasTwoLevelRouter = false // 是否添加过二级菜单
        let multipleTwoLevelRouter = 0 // 是否需要添加多个二级菜单
        if (!this.user.isSuper) { // 如果不是超级管理员，做权限路由拦截
          for (let i = 0; i < homeRouterTwoLevel.length; i++) {
            // 判断是否只有一级菜单
            if (!homeRouter[i].length) {
              if (this.hasPermission(homeRouter[i])) {
                // 添加一级路由
                filterRouter.push(homeRouter[i])
              }
            } else {
              hasOneLevelRouter = false
              homeRouter[i].children.length = 0
              for (let j = 0; j < homeRouterTwoLevel[i].children.length; j++) {
                // 判断是否只有一级、二级菜单
                if (!homeRouterTwoLevel[i].children[j].children) {
                  if (hasOneLevelRouter === false) {
                    // 添加一级路由
                    filterRouter.push(homeRouter[i])
                    hasOneLevelRouter = true
                  }
                  // 添加二级路由
                  filterRouter[filterRouter.length - 1].children.push(homeRouterTwoLevel[i].children[j])
                } else {
                  // 有三级菜单
                  if (multipleTwoLevelRouter !== i) {
                    homeRouter[i].children.length = 0
                    hasOneLevelRouter = false
                  }
                  hasTwoLevelRouter = false
                  homeRouterTwoLevel[i].children[j].children.length = 0
                  for (let k = 0; k < homeRouterThreeLevel[i].children[j].children.length; k++) {
                    if (this.hasPermission(homeRouterThreeLevel[i].children[j].children[k])) {
                      if (hasOneLevelRouter === false) {
                        // 添加一级路由
                        filterRouter.push(homeRouter[i])
                        hasOneLevelRouter = true
                        multipleTwoLevelRouter = i
                      }
                      if (hasTwoLevelRouter === false) {
                        // 添加二级路由
                        filterRouter[filterRouter.length - 1].children.push(homeRouterTwoLevel[i].children[j])  // eslint-disable-line
                        hasTwoLevelRouter = true
                      }
                      // 添加三级路由
                      filterRouter[filterRouter.length - 1].children[filterRouter[filterRouter.length - 1].children.length - 1].children.push(homeRouterThreeLevel[i].children[j].children[k]) // eslint-disable-line
                    }
                  }
                }
              }
            }
          }
          // 更新路由数据
          routes[0].children.length = 0
          routes[0].children = filterRouter
        }
        this.SET_SIDEBAR_LIST(this.getSideBarList())
      },
      // 判断是否有访问该路由的权限
      hasPermission(router) {
        if (router.meta && router.meta.auths) {
          return this.auths.some(auth => router.meta.auths.indexOf(auth) > 0)
        }
      },
      // 菜单渲染
      getSideBarList () {
        let layoutArr = []
        const routesArr = [...routes]
        const recursion = (a) => {
          for (const key in a) {
            if (Object.prototype.hasOwnProperty.call(a, key)) {
              const element = a[key]
              if (!element.component) {
                a.splice(key, 1)
              }
              if (element.children) {
                recursion(a[key].children)
              }
            }
          }
        }
        for (const key in routesArr) {
          if (routesArr[key].name === 'home') {
            layoutArr = routesArr[key].children
            break
          }
        }
        recursion(layoutArr)
        return layoutArr
      },
      // 路由标记位
      indexToString (num) {
        this.itemIndex = num
        return num.toString()
      },
      ...mapMutations([
        'SET_SIDEBAR_LIST'
      ])
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
  @import "~assets/styles/index.scss";

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
