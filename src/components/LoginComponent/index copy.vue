<!--  -->
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="账户密码登录" name="account">
      <el-form
        :model="loginForm"
        :rules="loginRule"
        ref="loginForm"
        @keyup.enter.native="loginFormSubmit()"
        status-icon
      >
        <el-form-item prop="userName">
          <el-input v-model="loginForm.userName" placeholder="帐号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-checkbox>自动登录</el-checkbox>
            </el-col>
            <el-col :span="12">
              <el-link
                :underline="false"
                type="primary"
                class="forget_password"
                @click.native="handleForget"
              >忘记密码</el-link>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn-submit" type="primary" @click="loginFormSubmit()">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-row :gutter="24">
            <el-col :span="12">其他登录方式</el-col>
            <el-col :span="12">
              <el-link
                :underline="false"
                type="primary"
                class="forget_password"
                @click.native="handleRegist"
              >注册账号</el-link>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="手机号登录" name="phone">
      <el-form
        :model="loginFormPhone"
        :rules="loginPhone"
        ref="loginForm"
        @keyup.enter.native="loginFormSubmit()"
        status-icon
      >
        <el-form-item prop="phoneId">
          <el-input v-model="loginFormPhone.phoneId" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item prop="verifyCode">
          <el-input v-model="loginFormPhone.verifyCode" type="password" placeholder="验证码"></el-input>
          <el-button>获取验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-checkbox>自动登录</el-checkbox>
            </el-col>
            <el-col :span="12">
              <el-link
                :underline="false"
                type="primary"
                class="forget_password"
                @click.native="handleForget"
              >忘记密码</el-link>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn-submit" type="primary" @click="loginFormSubmit()">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-row :gutter="24">
            <el-col :span="12">其他登录方式</el-col>
            <el-col :span="12">
              <el-link
                :underline="false"
                type="primary"
                class="forget_password"
                @click.native="handleRegist"
              >注册账号</el-link>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { getUUID } from "@/utils";
import bus from "@/utils/eventBus";
export default {
  props: {
    isLogin: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      activeName: "account",
      loginForm: {
        userName: "",
        password: "",
        uuid: "",
      },
      loginRule: {
        userName: [
          { required: true, message: "帐号不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ]
      },
      loginFormPhone: {
        phoneId: "",
        verifyCode: ""
      },
      loginPhone: {
        phoneId: [
          { required: true, message: "帐号不能为空", trigger: "blur" }
        ],
        verifyCode: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ]
      },
      captchaPath: ""
    };
  },
  created() {
    this.getCaptcha();
  },
  methods: {
    // 提交表单
    loginFormSubmit() {
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl("/sys/login"),
            method: "post",
            data: this.$http.adornData({
              username: this.loginForm.userName,
              password: this.loginForm.password,
              uuid: this.loginForm.uuid,
              captcha: this.loginForm.captcha
            })
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$cookie.set("token", data.token);
              this.$router.replace({ name: "home" });
            } else {
              this.getCaptcha();
              this.$message.error(data.msg);
            }
          });
        }
      });
    },
    // 获取验证码
    getCaptcha() {
      this.loginForm.uuid = getUUID();
      this.captchaPath = this.$http.adornUrl(
        `/captcha.jpg?uuid=${this.loginForm.uuid}`
      );
    },
    handleForget(e) {
      this.$emit("isforgot", true);
    },
    handleRegist(e) {
      this.$emit("isregist", true);
    }
  }
};
</script>
<style scoped>
</style>