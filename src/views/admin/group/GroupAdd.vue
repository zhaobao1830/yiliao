<template>
  <div class="container">
    <div class="title">新建分组信息</div>
    <lin-1px></lin-1px>
    <el-row>
      <el-col
        :lg="16"
        :md="20"
        :sm="24"
        :xs="24">
        <div class="content">
          <el-form
            status-icon
            :rules="rules"
            :model="form"
            ref="form"
            label-position="right"
            label-width="100px"
            v-loading="loading"
            @submit.native.prevent>
            <el-form-item label="分组名称" prop="name">
              <el-input clearable v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="分组描述" prop="info">
              <el-input clearable v-model="form.info"></el-input>
            </el-form-item>
            <el-form-item>
              <group-auths
                @updateAuths="updateAuths"
                @updateAllAuths="updateAllAuths"
                ref="groupAuths"
                title="分配权限">
              </group-auths>
            </el-form-item>
            <el-form-item class="submit">
              <l-button type="primary" @click="submitForm('form')">保 存</l-button>
              <l-button @click="resetForm('form')">重 置</l-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Admin from '@/lin/models/admin'
  import GroupAuths from './GroupAuths'

  export default {
    components: {
      GroupAuths
    },
    inject: ['eventBus'],
    data() {
      const checkName = (rule, value, callback) => { // eslint-disable-line
        if (!value) {
          return callback(new Error('分组名称不能为空'))
        }
        callback()
      }
      return {
        allAuths: [], // 所有权限
        auths: [], // 最终选择的权限
        form: {
          name: '',
          info: ''
        },
        rules: {
          name: [
            { validator: checkName, trigger: ['blur', 'change'], required: true }
          ],
          info: []
        },
        loading: false
      }
    },
    methods: {
      updateAuths(auths) {
        this.auths = auths
      },
      updateAllAuths(allAuths) {
        this.allAuths = allAuths
      },
      async submitForm(formName) {
        this.$refs[formName].validate(async (valid) => { // eslint-disable-line
          if (valid) {
            let res
            const finalAuths = this.auths.filter(x => Object.keys(this.allAuths).indexOf(x) < 0)
            try {
              this.loading = true
              res = await Admin.createOneGroup(this.form.name, this.form.info, finalAuths, this.id) // eslint-disable-line
            } catch (e) {
              this.loading = false
              console.log(e)
            }
            if (res.error_code === 0) {
              this.loading = false
              this.$message.success(`${res.msg}`)
              this.eventBus.$emit('addGroup', true)
              this.$router.push('/admin/group/list')
              this.resetForm('form')
            } else {
              this.loading = false
              this.$message.error(`${res.msg}`)
            }
          } else {
            this.$message.error('请将信息填写完整')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
        this.$refs.groupAuths.getGroupAuths()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/styles/index.scss';

  .container {
    .title {
      height: 59px;
      line-height: 59px;
      color: $parent-title-color;
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      text-indent: 40px;
    }

    .content {
      margin-top: 10px;
      padding-left: 25px;
      padding-right: 40px;
    }

    .submit {
      float: left;
    }
  }
</style>
