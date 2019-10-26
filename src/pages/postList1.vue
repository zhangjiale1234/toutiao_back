<template>
  <div class="postList">
    <!-- 面包屑使用 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格使用 -->
    <el-table :data="postsList" style="width: 100%">
      <el-table-column label="标题" width="380">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date |formDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.type===1?'文章':'视频'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300">
        <el-tooltip content="编辑" placement="top">
          <el-button type="primary" icon="el-icon-edit">编辑</el-button>
        </el-tooltip>
        <el-tooltip content="删除" placement="top">
          <el-button type="danger" icon="el-icon-delete">删除</el-button>
        </el-tooltip>
      </el-table-column>
    </el-table>
    <!-- 分页功能 -->
      <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[2,4,6,8]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
  </div>
</template>

<script>
import { postsList } from '@/api/posts.js'
export default {
  data () {
    return {
      total: 100,
      sizes: [2, 4, 6, 8],
      postsList: [],
      //  页码
      pageIndex: 1,
      // 每页记录数
      pageSize: 2
    }
  },
  methods: {
    init () {
      postsList(
        {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      ).then(res => {
        if (res.status === 200) {
          this.postsList = res.data.data
          this.total = res.data.total
        }
        console.log(res.data.total)
      })
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },

    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.init()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pageIndex = val
      this.init()
    }

  },
  filters: {
    formDate (time, spe) {
      spe = spe || '-'
      let timeNow = new Date()
      let year = timeNow.getFullYear()
      let month = timeNow.getMonth()
      let day = timeNow.getDate()
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
