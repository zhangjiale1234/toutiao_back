<template>
  <div class="login">
    <div class="container">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
      <img src="../assets/avatar.jpg" alt="" class="avatar">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
         <el-form-item label="密码"  prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
      </el-form>
       <el-button type="primary" class="login-btn" @click="login" ref="loginForm">登录</el-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/users.js'
export default {
  data () {
    return {
      ruleForm: {
        username: '10086',
        password: '123'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 16, message: '请输入合法的用户名，长度在3-16位', trigger: 'blur', pattern: /\w{1,}/ }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      //  再次验证用户数据是否输入合法，如果输入合法，则发起登陆验证的请求，否则给出提示并终止本次请求
      this.$refs.ruleForm.validate(async e => {
        console.log(e)
        if (e) {
          let res = await login(this.ruleForm)
          console.log(res)
          if (res.data.message === '登录成功' && res.data.data.token) {
            localStorage.setItem('successLogin_back', res.data.data.token)
            // 登录成功跳转首页
            // 存起token值
            this.$router.push('/')
          } else {
            this.$message.error('用户名或密码输入错误')
            return false
          }
        }
        // 如果他是true才开始发起验证请求
      })
    }
  }
}

</script>

<style lang = 'less' scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
