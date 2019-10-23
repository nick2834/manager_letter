<!-- 导入弹窗 -->
<template>
  <el-dialog title="侵权信息列表导入" :visible.sync="uploadVisible" width="40%" :show-close="false" class="el-dialog__header-bg">
    <el-upload
      class="upload-content"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      multiple
      :on-preview="handlePreview"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <span slot="footer" class="dialog-footer">
      <el-button @click="uploadVisible = false" size="medium">取 消</el-button>
      <el-button type="primary" @click="uploadVisible = false" size="medium">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      uploadVisible: false,
      lawyerform: {
        office: "",
        lawyer: ""
      }
    };
  },
  methods: {
    init() {
      this.uploadVisible = true;
    },
    handlePreview(e){
      console.log(e)
    }
  }
};
</script>
<style scoped lang='scss'>
.upload-content {
  width: 100%;
  .el-upload {
    width: 100%;
  }
}
</style>