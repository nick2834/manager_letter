<!-- 新增公司 -->
<template>
  <el-dialog title="新增公司" :visible.sync="companyVisible" width="40%" :show-close="false" class="el-dialog__header-bg">
    <el-form :model="companyForm">
      <el-form-item label="公司名称：" label-width="100px">
        <el-input v-model="companyForm.company"></el-input>
      </el-form-item>
      <el-form-item label="公司名称：" label-width="100px">
        <el-input v-model="companyForm.address"></el-input>
      </el-form-item>
      <el-form-item label="邮   箱：" label-width="100px">
        <el-input type="textarea" :rows="4" v-model="companyForm.email"></el-input>
        <span>多个邮箱请按“enter”键换行增加</span>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="companyVisible = false" size="medium">取 消</el-button>
      <el-button type="primary" @click="companyVisible = false" size="medium">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      companyVisible: false,
      companyForm: {
        company: "",
        address: "",
        email: ""
      }
    };
  },
  methods: {
    init(id) {
      this.companyVisible = true;
    }
  }
};
</script>
<style scoped lang='scss'>
</style>