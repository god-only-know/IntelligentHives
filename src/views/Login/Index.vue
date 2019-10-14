<template>
  <div class="login-panel">
    <div class="title">蜂箱检测控制系统</div>
    <el-card class="login-card" :body-style="{ padding: '20px 30px' }">
      <div class="login-card_title">登录页面</div>
      <el-form ref="loginForm" :model="form" :rules="rules" class="login-form">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="verifyCode" class="verify-code-row">
          <el-input v-model="form.verifyCode" placeholder="验证码"></el-input>
          <div class="verify-code" @click="refreshVerifyCode">
            <verify-code :identifyCode="identifyCode"></verify-code>
          </div>
        </el-form-item>
        <el-checkbox v-model="form.rememberAccount">记录密码</el-checkbox>
        <el-form-item>
          <el-button
            type="primary"
            style="width:100%"
            @click="handleLogin"
            v-loading="loading"
            >登 陆</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import VerifyCode from "@/components/VerifyCode/Index.vue";
import {
  username as usernameRegExp,
  password as passwordRegExp,
  verifyCode as verifyCodeRegExp
} from "@/utils/validate";
export default {
  data() {
    return {
      form: {
        username: "admin",
        password: "admin",
        verifyCode: "",
        rememberAccount: false
      },
      rules: {
        username: {
          validator: (rule, value, callback) => {
            if (usernameRegExp.test(value)) {
              callback();
            } else {
              callback("请输入4-16位数字、字母或下划线");
            }
          },
          trigger: "blur"
        },
        password: {
          validator: (rule, value, callback) => {
            if (passwordRegExp.test(value)) {
              callback();
            } else {
              callback("请输入4-16位数字、字母或下划线");
            }
          },
          trigger: "blur"
        },
        verifyCode: {
          validator: (rule, value, callback) => {
            if (verifyCodeRegExp.test(value)) {
              if (value === this.identifyCode) {
                callback();
              } else {
                callback("验证码不正确");
              }
            } else {
              callback("请输入4位数字、字母");
            }
          },
          trigger: "blur"
        }
      },
      identifyCode: "",
      identifyCodeLength: 4,
      loading: false
    };
  },
  created() {
    let token = localStorage.getItem("token");
    if (token) {
      this.$store.commit("SET_TOKEN", token);
      this.$router.push("/home");
    }
    this.refreshVerifyCode();
  },
  methods: {
    refreshVerifyCode() {
      let identifyCode = "";
      for (let i = 0; i < this.identifyCodeLength; i++) {
        let char = Math.floor(Math.random() * 36);
        char =
          char >= 10
            ? String.fromCharCode("a".charCodeAt(0) + char - 10)
            : char.toString();
        identifyCode += char;
      }
      this.identifyCode = identifyCode;

      this.form.verifyCode = identifyCode;
    },
    handleLogin() {
      this.$refs["loginForm"].validate(async valid => {
        if (valid) {
          this.loading = true;
          let res = await this.$API.login(this.form);
          if (res.code === undefined) {
            if (this.form.rememberAccount) {
              localStorage.setItem("token", res.token);
            } else {
              localStorage.removeItem("token");
            }
            this.$store.commit("SET_TOKEN", res.token);
            this.$router.push("/home");
          }
          this.loading = false;
        }
      });
    }
  },
  components: {
    VerifyCode
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
.login-panel {
  height: 100vh;
  width: 100vw;
  background-image: url("../../assets/imgs/loginBg.jpg");
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title {
    color: #ffd700;
    font-family: "黑体";
    font-weight: bold;
    font-size: 40px;
    letter-spacing: 0;
    text-align: center;
    text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777,
      0px 4px 0px #666, 0px 5px 0px #555;
    margin-bottom: 30px;
  }
  .login-card {
    width: 400px;
    .login-card_title {
      font-size: 18px;
      letter-spacing: 2px;
    }
  }
  .login-form {
    margin-top: 20px;
    .el-form-item {
      height: 40px;
    }
    .verify-code-row {
      position: relative;
      height: 38px;
      .el-input {
        width: 120px;
        vertical-align: top;
      }
    }
    .verify-code {
      display: inline-block;
      margin-left: 10px;
      cursor: pointer;
      height: 38px;
      overflow: hidden;
    }
    .el-checkbox {
      margin-bottom: 10px;
      float: right;
      margin-right: 0px;
    }
  }
}
</style>
