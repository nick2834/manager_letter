<!-- 转律师弹窗 -->
<template>
  <el-dialog title="转律师" :visible.sync="lawyerVisible" width="40%" :show-close="false" class="el-dialog__header-bg">
    <el-form :model="lawyerform">
      <el-form-item label="事务所名称：" label-width="100px">
        <el-select v-model="lawyerform.office" placeholder="请输入事务所">
          <el-option label="得伟君尚律师事务所" value="得伟君尚律师事务所"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="律师姓名：" label-width="100px">
        <el-select v-model="lawyerform.lawyer" placeholder="请输入律师姓名">
          <el-option label="张晓明" value="张晓明"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="lawyerVisible = false" size="medium">取 消</el-button>
      <el-button type="primary" @click="lawyerVisible = false" size="medium">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      lawyerVisible: false,
      lawyerform: {
        office: "",
        lawyer: ""
      }
    };
  },
  methods: {
    init(id) {
      this.lawyerVisible = true;
    }
  }
};
</script>
<style scoped lang='scss'>
</style>