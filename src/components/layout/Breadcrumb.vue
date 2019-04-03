  <template>
    <div class="nav-title">
      <a
        class="item"
        v-for="(item, index) in titleArr"
        style="cursor: default;"
        :key="index">
        <p>{{item}}</p>
      </a>
    </div>
  </template>

  <script>
    import { mapGetters } from 'vuex'

    export default {
      data() {
        return {}
      },
      computed: {
        stageInfo() {
          return this.getStageInfo(this.$route.name)
        },
        titleArr() {
          return this.stageInfo.map(item => item.title).filter(item => !!item)
        },
        ...mapGetters(['getStageInfo'])
      }
    }
  </script>

  <style lang="scss">
    .nav-title {
      display: flex;
      align-items: center;
      font-size: 14px;

      .item {
        i {
          margin-right: 4px;
        }

        display: flex;
        align-items: center;
        padding-right: 18px;
        position: relative;
        color: rgba(89, 108, 142, 1);

        &:after {
          content: "/";
          position: absolute;
          top: 0;
          right: 6px;
        }
      }

      .item:last-child {
        color: #fff;
        padding-right: 0;

        &:after {
          content: "";
        }
      }
    }
  </style>
