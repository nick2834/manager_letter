<!-- 新增平台 -->
<template>
  <el-dialog
    title="新增平台"
    :visible.sync="platfromVisible"
    width="40%"
    :show-close="false"
    class="el-dialog__header-bg"
  >
    <el-form :model="platfrom">
      <el-form-item label="公司名称：" label-width="100px">
        <span>{{platfrom.company}}</span>
      </el-form-item>
      <el-form-item label="平台名称：" label-width="100px">
        <el-input type="textarea" :rows="4" v-model="platfrom.desc"></el-input>
        <span>多个邮箱请按“enter”键换行增加</span>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="platfromVisible = false" size="medium">取 消</el-button>
      <el-button type="primary" @click="platfromVisible = false" size="medium">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      platfromVisible: false,
      platfrom: {
        company: "",
        desc: ""
      }
    };
  },
  methods: {
    init(id) {
      console.log(id)
      this.platfromVisible = true;
      this.platfrom.company = id.company
    }
  }
};
</script>
<style scoped lang='scss'>
</style>