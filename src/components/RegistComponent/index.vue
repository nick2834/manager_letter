<!--  -->
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="邮箱找回" name="first">
      <el-link type="primary" class="forget_password" @click.native="handleback">返回登录</el-link>
    </el-tab-pane>
    <el-tab-pane label="手机号找回" name="second">
      <el-link type="primary" class="forget_password" @click.native="handleback">返回登录</el-link>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first"
    };
  },
  methods: {
    handleClick(tab, event) {
      //   console.log(tab, event);
    },
    handleback() {
      console.log(123);
      this.$emit("backlogin", true);
    }
  }
};
</script>
<style scoped>
</style>