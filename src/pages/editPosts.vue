<template>
  <div class="editPost">
    <!-- 面包屑使用 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章发布</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 标题 -->
    <el-form :model="addForm" ref="ruleForm" label-width="80px" class="demo-ruleForm">
      <el-form-item label="标题" prop="title">
        <el-input v-model="addForm.title"></el-input>
      </el-form-item>
      <el-form-item label="类型:">
        <el-radio-group v-model="addForm.type">
          <el-radio :label="1">文章</el-radio>
          <el-radio :label="2">视频</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="上传:" v-if="addForm.type === 1">
        <!-- 富文本框 -->
        <VueEditor :config="config" ref="contentText" />
      </el-form-item>
      <el-form-item label="内容:" v-if="addForm.type === 2">
        <!-- 视频 -->
        <el-upload
          class="upload-demo"
          action="http://127.0.0.1:3000/upload/"
          :on-preview="handlePreview"
          :von-success="videoSuccess"
          :headers="getToken()"
          :limit="3"
          :on-exceed="handleExceed"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <VueEditor :config="config" ref="contentText"/>
      </el-form-item>
      <!-- 富文本框 -->
      <el-form-item label="栏目:">
        <div style="border:1px solid #ccc">
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedCate" @change="handleCheckedCitiesChange">
            <el-checkbox :label="item.id" v-for="item in cateList" :key="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form-item>
      <!-- 封面 -->
      <el-form-item label="封面:">
        <el-upload
          action="http://127.0.0.1:3000/upload/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :headers="getToken()"
          :on-success="imgSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>
      <el-form-item style="float:right">
        <el-button type="primary" @click="add">立即发布</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import VueEditor from 'vue-word-editor'
import { getCategory, sendPosts } from '@/api/posts.js'
export default {
  data () {
    return {
      addForm: {
        type: 1,
        title: '',
        content: '',
        categories: [],
        cover: []
      },
      cateList: [], // 数据源
      checkedCate: [], // 用来存储选中栏目id的数组
      radio2: 2,
      config: {
        // 上传图片的配置
        uploadImage: {
          url: 'http://localhost:3000/upload',
          name: 'file',
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          headers: this.getToken(),
          uploadSuccess (res, insert) {
            console.log(res)
            insert('http://localhost:3000' + res.data.data.url)
          }
        },

        // 上传视频的配置
        uploadVideo: {
          url: 'http://localhost:3000/upload',
          name: 'file',
          headers: this.getToken(),
          uploadSuccess (res, insert) {
            insert('http://localhost:3000' + res.data.data.url)
          }
        }
      },
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  components: {
    VueEditor
  },
  methods: {
    // 封面上传
    imgSuccess (res) {
      console.log(res)
      this.addForm.cover.push({ id: res.data.id })
      console.log(this.addForm)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleCheckedCitiesChange (val) {
      // 将id用map去遍历，返回一个对象形式的数组存在categories里面
      this.addForm.categories = this.checkedCate.map(e => {
        return { id: e }
      })
    },
    handleExceed (val) {
      console.log(val)
    },
    // 设置请求头的方法
    getToken () {
      return {
        Authorization: localStorage.getItem('successLogin_back')
      }
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = false
    },
    // 新增文章
    add () {
      // 通过这个方式获取到富文本框的值，然后赋值给fromAdd
      this.addForm.content = this.$refs.contentText.editor.root.innerHTML
      sendPosts(this.addForm)
        .then(res => {
          console.log(res)
          if (res.status === 200 && res.data.message === '文章发布成功') {
            this.$message.success('发布成功')
            this.$router.push('/postList')
          }
        })
    },
    // 视频上传
    videoSuccess (response) {
      console.log(response)
    }
  },
  mounted () {
    getCategory().then(res => {
      console.log(res)
      console.log(this.addForm)
      if (res.status === 200) {
        this.cateList = res.data.data.splice(2)
      }
    })
  }
}
</script>

<style>
</style>
