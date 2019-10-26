<template>
  <div class="home">
    <el-container>
        <!-- 左边结构 -->
      <!-- 只是用来上传git -->
      <el-aside width="200px">
          <el-menu
      default-active="1-1"
      :router='true'
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <img src="../assets/logo.png" alt="" class="logo">
      <el-submenu index="1">
        <template slot="title">
          <i class="icon-user-check"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">子项1</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>文章管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="postList"><i class="el-icon-document"></i>文章列表</el-menu-item>
          <el-menu-item index="editPost"><i class="el-icon-edit-outline"></i>文章发布</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>栏目管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1">管理1</el-menu-item>
          <el-menu-item index="3-2">管理2</el-menu-item>
        </el-menu-item-group>

      </el-submenu>
    </el-menu>
      </el-aside>

      <el-container>
          <!-- 右边头部结构 -->
        <el-header>
                <span class="el-icon-menu"></span>
                <span>黑马头条后台管理系统</span>
                <div class="right">
                    <span>欢迎***</span>&nbsp;&nbsp;
                    <router-link to=''>
                    <span @click="exit" >退出</span>
                    </router-link>
                </div>
        </el-header>
        <!-- 右边身体结构 -->
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  methods: {
    exit () {
      localStorage.removeItem('successLogin_back')
      if (!confirm('您是否要退出登录呢')) return
      this.$message.success('退出成功')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang='less' scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
   font-size: 25px;
   color: #888888;
      color: #fff;
   .right{
   color: #fff;
       font-size: 16px;
        span:nth-child(1){
            margin-right: 10px;
        }
   }
  }
  .logo {
    height:60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292CF;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
}
</style>
