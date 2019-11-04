<!-- 转律师弹窗 -->
<template>
  <el-dialog title="信息审核" :visible.sync="lawyerVisible" width="40%" :show-close="false" class="el-dialog__header-bg">
    <el-form :model="lawyerform">
      <el-form-item label="审核：" label-width="100px">
        <el-select v-model="lawyerform.office" placeholder="请选择审核类型">
          <el-option label="通过" value="1"></el-option>
          <el-option label="不通过" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注：" label-width="100px">
        <el-input type="textarea" :rows="4" v-model="lawyerform.desc">

        </el-input>
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
        desc: ""
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