<template>
  <el-container>
    <el-header
      type="flex"
      justify="end"
    >
      <el-row
        type="flex"
        justify="end"
        align="bottom"
      >
        <el-col :span="3">
          <el-button
            type="info"
            size="mini"
            @click="toAddRecord"
          >
            新增
          </el-button>
        </el-col>
      </el-row>
    </el-header>

    <el-main>
      <el-table
        ref="filterTable"
        :border="true"
        :data="recordList"
        header-cell-class-name="header_style"
      >
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="50"
        />
        <el-table-column
          prop="brand"
          label="汽车品牌"
          align="center"
        />
        <el-table-column
          prop="startSign"
          label="起始标记"
          align="center"
        />
        <el-table-column
          prop="endSign"
          label="终止标记"
          align="center"
        />
        <el-table-column
          prop="distance"
          label="距离"
          align="center"
        />
        <el-table-column
          prop="driver"
          label="驾驶人"
          align="center"
        />
        <el-table-column
          prop="age"
          label="年龄"
          align="center"
        />
        <el-table-column
          prop="drivingYears"
          label="驾龄"
          align="center"
        />
        <el-table-column
          label="身体状况"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.condition === 0 ? '健康' : scope.row.condition === 1 ? '亚健康' : '不健康' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="是否合格"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.isStandard === 1 ? '合格' : '不合格' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="180"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <Dialog
      :visible="dialogVisible"
      :current-record="currentRecord"
      :index="currentIndex"
      :is-edit="isEdit"
      @dialogClose="dialogCloseEvent"
      @submitInfo="submitRecord"
    />
  </el-container>
</template>

<script>
import Dialog from '@/components/Dialog.vue'

export default {
  name: 'Home',

  components: {
    Dialog
  },

  data () {
    return {
      recordList: [{
        brand: '福特',
        startSign: 'ZK123+123',
        endSign: 'ZK123+225',
        distance: 102,
        driver: '王某',
        age: 34,
        drivingYears: 5.6,
        condition: 0, // 0 健康 1 亚健康 2 不健康
        isStandard: 1 // 0 不合格 1 合格
      }, {
        brand: '大众',
        startSign: 'ZK123+123',
        endSign: 'ZK123+225',
        distance: 102,
        driver: '韩某',
        age: 25,
        drivingYears: 2.3,
        condition: 1,
        isStandard: 0
      }, {
        brand: '本田',
        startSign: 'ZK123+123',
        endSign: 'ZK123+225',
        distance: 102,
        driver: '蒋某',
        age: 26,
        drivingYears: 2,
        condition: 2,
        isStandard: 0
      }], // 表格数据
      dialogVisible: false, // 弹窗关闭
      currentRecord: {}, // 当前记录
      isEdit: false, // 是否编辑
      currentIndex: 0 // 当前 index
    }
  },

  methods: {
    /**
     * @description 添加记录
     */
    toAddRecord () {
      this.currentRecord = {}
      this.isEdit = false
      this.dialogVisible = true
    },

    /**
     * @description 弹窗关闭事件
     */
    dialogCloseEvent (_boolean) {
      this.dialogVisible = _boolean
    },

    /**
     * @description 提交记录
     */
    submitRecord (recordInfo, isEdit, index = 0) {
      if (isEdit) {
        this.$set(this.recordList, index, recordInfo)
      } else {
        this.recordList.push(recordInfo)
      }
    },

    /**
     * @description 表格编辑
     * @param index 当前选中行 index
     * @param row 当前选中行数据
     */
    handleEdit (index, row) {
      this.currentIndex = index
      this.currentRecord = row
      this.isEdit = true
      this.dialogVisible = true
    },

    /**
     * @description 表格删除
     * @param index 当前选中行 index
     * @param row 当前选中行数据
     */
    handleDelete (index, row) {
      this.$confirm('此操作将删除当前记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.recordList.splice(index, 1)

        setTimeout(() => {
          alert('删除成功！')
        }, 100)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  .el-header {
    .el-row {
      height: 100%;
    }
  }
}
</style>

<style>
.header_style {
  background: #ccc !important;
}
</style>
