<template>
  <el-dialog
    :title="isEdit ? '编辑页面' : '新增页面'"
    :visible.sync="dialogVisible"
    :show-close="false"
    width="40%"
    :before-close="handleClose"
  >
    <el-form
      ref="ruleForm"
      :model="recordInfo"
      :rules="rules"
    >
      <el-form-item>
        <el-col :span="11">
          <el-form-item prop="brand">
            <el-input
              v-model="recordInfo.brand"
              placeholder="汽车品牌"
            />
          </el-form-item>
        </el-col>
        <el-col
          :span="11"
          :offset="2"
        >
          <el-form-item prop="startSign">
            <el-input
              v-model="recordInfo.startSign"
              placeholder="起始标记"
            />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="11">
          <el-form-item prop="endSign">
            <el-input
              v-model="recordInfo.endSign"
              placeholder="终止标记"
            />
          </el-form-item>
        </el-col>
        <el-col
          :span="11"
          :offset="2"
        >
          <el-form-item>
            <el-input
              v-if="dialogVisible"
              v-model="distance"
              placeholder="距离"
              disabled
            />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="11">
          <el-form-item prop="driver">
            <el-input
              v-model="recordInfo.driver"
              placeholder="驾驶人"
            />
          </el-form-item>
        </el-col>
        <el-col
          :span="11"
          :offset="2"
        >
          <el-form-item prop="age">
            <el-input
              v-model="recordInfo.age"
              placeholder="年龄"
            />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="11">
          <el-form-item prop="drivingYears">
            <el-input
              v-model="recordInfo.drivingYears"
              placeholder="驾龄"
            />
          </el-form-item>
        </el-col>
        <el-col
          :span="11"
          :offset="2"
        >
          <el-form-item>
            <el-select
              v-model="recordInfo.isStandard"
              placeholder="是否健康"
              disabled
            >
              <el-option
                v-for="item in standardOptions"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="11">
          <el-form-item prop="condition">
            <el-select
              v-model="recordInfo.condition"
              placeholder="身体状况"
            >
              <el-option
                v-for="item in conditionOptions"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          :span="11"
          :offset="2"
        >
          <el-form-item>
            <el-date-picker
              v-model="recordInfo.loginTime"
              type="datetime"
              placeholder="登录时间"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button @click="toCancel">
          取 消
        </el-button>
        <el-button
          type="primary"
          @click="toSubmit('ruleForm')"
        >
          确 定
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'Dialog',

  props: {
    visible: Boolean,
    currentRecord: {
      type: Object,
      default: () => ({})
    },
    isEdit: Boolean,
    index: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      dialogVisible: false,
      recordInfo: {
        brand: ''
      }, // 记录信息
      rules: {
        brand: [
          { required: true, message: '请输入汽车品牌', trigger: 'blur' }
        ],
        startSign: [
          { required: true, message: '请输入起始标志', trigger: 'blur' }
        ],
        endSign: [
          { required: true, message: '请输入终止标志', trigger: 'blur' }
        ],
        driver: [
          { required: true, message: '请输入驾驶人', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' }
        ],
        drivingYears: [
          { required: true, message: '请输入驾龄', trigger: 'blur' }
        ],
        condition: [
          { required: true, message: '请选择身体状况', trigger: 'blur' }
        ]
      }, // 表单验证
      standardOptions: [{
        name: '不合格',
        value: 0
      }, {
        name: '合格',
        value: 1
      }], // 是否合格
      conditionOptions: [{
        name: '健康',
        value: 0
      }, {
        name: '亚健康',
        value: 1
      }, {
        name: '不健康',
        value: 2
      }] // 健康状况
    }
  },

  computed: {
    /**
     * @description 计算距离
     */
    distance: {
      get () {
        const startNum = Number((this.recordInfo.startSign || '').replace(/[^0-9]/ig, ''))
        const endNum = Number((this.recordInfo.endSign || '').replace(/[^0-9]/ig, ''))
        const cache = (endNum - startNum) > 0 ? (endNum - startNum) : 0
        this.$set(this.recordInfo, 'distance', cache)

        return cache
      },
      set (val) {}
    }
  },

  watch: {
    visible (val) {
      this.dialogVisible = val
    },

    currentRecord (val) {
      this.recordInfo = JSON.parse(JSON.stringify(val))
    },

    /**
     * @description 监听身体状况
     */
    'recordInfo.condition' (val) {
      if (val) {
        this.recordInfo.isStandard = 0
      } else {
        this.recordInfo.isStandard = 1
      }
    }
  },

  methods: {
    /**
     * @description 关闭弹窗
     */
    handleClose () {
      this.$refs.ruleForm.resetFields()
      this.$emit('dialogClose', false)
    },

    /**
     * @description 点击取消
     */
    toCancel () {
      this.$refs.ruleForm.resetFields()
      this.$emit('dialogClose', false)
    },

    /**
     * @description 点击提交
     */
    toSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('dialogClose', false)
          this.$emit('submitInfo', this.recordInfo, this.isEdit, this.index)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
