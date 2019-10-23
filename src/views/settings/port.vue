<!-- 接口设置 -->
<template>
  <el-tabs type="border-card">
    <el-tab-pane label="短信接口">
      <sms-port />
    </el-tab-pane>
    <el-tab-pane label="邮箱接口">
      <mail-port />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import smsPort from "./port/smsPort";
import mailPort from "./port/mailPort";
export default {
  data() {
    return {};
  },

  components: { smsPort, mailPort },

  computed: {},

  mounted() {},

  methods: {}
};
</script>
<style scoped>

</style>