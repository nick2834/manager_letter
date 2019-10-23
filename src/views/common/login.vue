<template>
  <div class="site-wrapper site-page--login">
    <div class="site-content__wrapper">
      <div class="site-content">
        <div class="login-main">
          <h3 class="login-title">
            <img class="logo" src="~@/assets/img/login_logo.png" alt />发函管理系统
          </h3>
          <login-component v-if="isLogin" @isforgot="isforgot" @isregist="isregist"></login-component>
          <regist-component v-if="isRegist" @backlogin="backlogin"></regist-component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "@/utils/eventBus";
import loginComponent from "@/components/LoginComponent";
import registComponent from "@/components/RegistComponent";
export default {
  data() {
    return {
      isLogin: true,
      isRegist: false,
      isForget: false
    };
  },
  components: { loginComponent, registComponent },
  methods:{
    isforgot(e){
      this.isForget = e;
      this.isLogin = false;
      this.isRegist = false;
    },
    isregist(e){
      this.isRegist = e;
      this.isLogin = false;
      this.isForget = false;
    },
    backlogin(e){
      this.isLogin = e;
      this.isRegist = false;
      this.isForget = false;
    }
  }
};
</script>

<style lang="scss">
.site-wrapper.site-page--login {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  // background-color: rgba(38, 50, 56, .6);
  overflow: hidden;
  &:before {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    content: "";
    background-image: url(~@/assets/img/login_bg.jpg);
    background-size: cover;
    background-position: center;
  }
  .site-content__wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 0;
    margin: 0;
    overflow: hidden;
    background-color: transparent;
  }
  .site-content {
    min-height: 100%;
    padding: 30px 500px 30px 30px;
  }
  .login-main {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    margin: 0 auto;
    padding: 150px 60px 180px;
    width: 470px;
    min-height: 100%;
    // background-color: #fff;
  }
  .login-title {
    font-size: 32px;
    color: #06284d;
    text-align: center;
    line-height: 80px;
    height: 80px;
    img {
      width: 80px;
      height: 80px;
      vertical-align: top;
    }
  }
  .login-captcha {
    overflow: hidden;
    > img {
      width: 100%;
      cursor: pointer;
    }
  }
  .forget_password {
    float: right;
    color: #3e8ef7;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      color: #108ee9;
    }
  }
  .login-btn-submit {
    width: 100%;
  }
}
</style>
