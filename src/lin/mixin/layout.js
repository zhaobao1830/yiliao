import { mapGetters } from 'vuex'

export default {
  mounted () {
    this.$nextTick(() => {
      this.setMenuDefaultActive()
    })
  },
  watch: {
    $route () {
      this.setMenuDefaultActive()
    }
  },
  computed: {
    ...mapGetters(['sideBarList'])
  },
  methods: {
    setMenuDefaultActive() {
      const { path } = this.$route
      const { sideBarList } = this
      for (let i = 0; i < sideBarList.length; i++) {
        if (sideBarList[i].path === path) {
          this.$store.commit('SET_DEFAULT_ACTIVE_TAB', `${i}`)
        } else if (sideBarList[i].children) {
          for (let j = 0; j < sideBarList[i].children.length; j++) {
            if (sideBarList[i].children[j].path === path) {
              this.$store.commit('SET_DEFAULT_ACTIVE_TAB', `${i}-${j}`)
            }
          }
        }
      }
    }
  }
}
