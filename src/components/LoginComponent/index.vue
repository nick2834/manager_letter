<!--  -->
<template>
  <section>
    <el-tabs v-model="activeName">
      <el-tab-pane label="账户密码登录" name="account">
        <el-form
          :model="loginFormAccount"
          :rules="loginAccount"
          ref="loginFormAccount"
          @keyup.enter.native="loginFormSubmit()"
          status-icon
        >
          <el-form-item prop="userName">
            <el-input v-model="loginFormAccount.userName" placeholder="帐号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginFormAccount.password" type="password" placeholder="密码"></el-input>
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
              <el-col :span="12">
                <span>其他登录方式</span>
                <icon-svg name="wechat" class="wechat-icon" @click.native="centerDialogVisible = true"></icon-svg>
              </el-col>
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
          ref="loginFormPhone"
          @keyup.enter.native="loginFormPhoneSubmit()"
          status-icon
        >
          <el-form-item prop="phoneId">
            <el-input v-model="loginFormPhone.phoneId" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item prop="verifyCode">
            <el-row :gutter="10">
              <el-col :span="16">
                <el-input v-model="loginFormPhone.verifyCode" type="text" placeholder="验证码"></el-input>
              </el-col>
              <el-col :span="8">
                <el-button type="primary" class="verifyBtn">获取验证码</el-button>
              </el-col>
            </el-row>
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
            <el-button class="login-btn-submit" type="primary" @click="loginFormPhoneSubmit()">登录</el-button>
          </el-form-item>
          <el-form-item>
            <el-row :gutter="24">
              <el-col :span="12">
                <span>其他登录方式</span>
                <icon-svg name="wechat" class="wechat-icon" @click.native="centerDialogVisible = true"></icon-svg>
              </el-col>
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
    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center :show-close='false'>
      <img src="~@/assets/img/wechat_qrcode.png" alt="" style="width:100%">
    </el-dialog>
  </section>
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
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error("电话号码格式不正确"));
          }
        }
      }, 100);
    };
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱格式"));
        }
      }, 100);
    };
    return {
      activeName: "account",
      centerDialogVisible:false,
      loginFormAccount: {
        userName: "",
        password: ""
      },
      loginAccount: {
        userName: [{ validator: checkEmail, trigger: "blur" }],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      },
      loginFormPhone: {
        phoneId: "",
        verifyCode: ""
      },
      loginPhone: {
        phoneId: [{ validator: checkPhone, trigger: "blur" }],
        verifyCode: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ]
      },
      captchaPath: ""
    };
  },
  created() {
    // this.getCaptcha();
  },
  methods: {
    // 提交表单
    loginFormSubmit() {
      this.$refs["loginFormAccount"].validate(valid => {
        console.log(this.loginAccount.userName);
        if (valid) {
          this.$http({
            url: this.$http.adornUrl("/sys/login"),
            method: "post",
            data: this.$http.adornData({
              username: this.loginAccount.userName,
              password: this.loginAccount.password
            })
          }).then(({ data }) => {
            console.log(data);
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
    loginFormPhoneSubmit() {},
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
.verifyBtn {
  float: right;
}
.wechat-icon {
  width: 2em;
  height: 2em;
  vertical-align: middle;
  margin-left: 5px;
  cursor: pointer;
}
</style>