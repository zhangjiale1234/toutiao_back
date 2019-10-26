<template>
  <div class="postList">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: 'welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
      <!-- 表格使用 -->
    </el-breadcrumb>
    <el-table :data="postList" style="width: 100%">
      <el-table-column label="标题" width="300">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column label="日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date|getDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="作者" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.user.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
            <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index,row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
            <el-button type="primary" icon="el-icon-delete" @click="handleDelete(scope.$index,row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页实现 -->
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[2,4,6,8]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { postsList } from '@/api/posts.js'
export default {
  data () {
    return {
      postList: [],
      total: '',
      pageSize: 5,
      pageIndex: 1
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    // 分页
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      // 页面改变的时候重新获取数据在调用函数
      this.pageSize = val
      this.init()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      // 页面改变的时候重新获取数据在调用函数
      this.pageIndex = val
      this.init()
    },
    init () {
      postsList({
        pageSize: this.pageSize,
        pageIndex: this.pageIndex
      }).then(res => {
        console.log(res)
        if (res.status === 200) {
          this.postList = res.data.data
          this.total = res.data.total
        }
      })
    }
  },
  filters: {
    getDate (time2, spe) {
      spe = spe || '-'
      let time = new Date()
      let year = time.getFullYear()
      let month = time.getMonth()
      let day = time.getDate()
      return year + spe + month + spe + day
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style>
</style>
