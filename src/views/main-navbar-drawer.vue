<template>
  <el-drawer title="消息通知" :visible.sync="drawer" direction="rtl">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="130"></el-table-column>
      <el-table-column prop="message" label="通知"></el-table-column>
    </el-table>
  </el-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      tableData: [
        {
          date: "2016-05-02",
          message: "您有1条来自网易新闻的消息反馈"
        },
        {
          date: "2016-05-02",
          message: "您有1条来自网易新闻的消息反馈"
        },
        {
          date: "2016-05-02",
          message: "您有1条来自网易新闻的消息反馈"
        }
      ]
    };
  },
  methods: {
    // 初始化
    init() {
      this.drawer = true;
    }
  }
};
</script>

<style>
</style>