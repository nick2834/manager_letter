<template>
  <section>
    <el-page-header @back="$router.go(-1)" :content="$route.meta.title"></el-page-header>
    <div class="sub_title add_message">代入信息</div>
    <el-form ref="form" :model="formData" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="公司名称：">
            <el-input v-model="formData.company"></el-input>
          </el-form-item>
          <el-form-item label="作者名称：">
            <el-input v-model="formData.author"></el-input>
          </el-form-item>
          <el-form-item label="平台名称：">
            <el-input v-model="formData.platform"></el-input>
          </el-form-item>
          <el-form-item label="侵权内容：">
            <el-input type="textarea" v-model="formData.content" :rows="4"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="文章名称：">
            <el-input v-model="formData.title"></el-input>
          </el-form-item>
          <el-form-item label="链接地址：">
            <el-input v-model="formData.url"></el-input>
          </el-form-item>
          <el-form-item label="委托主体：">
            <el-radio-group v-model="formData.mainbody">
              <el-radio label="1">深圳市腾讯计算机系统有限公司</el-radio>
              <el-radio label="2">腾讯科技（深圳）有限公司</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="公司信息：">
            <el-switch
              active-color="#108ee9"
              v-model="formData.info"
              class="switchStyle"
              active-text="开"
              inactive-text="关"
            ></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="sub_title add_message">函件内容</div>
    <div class="btn_group">
      <el-button type="primary">确认</el-button>
      <el-button type="primary">预览</el-button>
    </div>
    <script :id="ueId" class="ueditor-box" type="text/plain" style="width: 100%; height: 260px;"></script>
  </section>
</template>

<script>
import ueditor from "ueditor";
export default {
  data() {
    return {
      formData: {
        company: "",
        author: "",
        platform: "",
        content: "",
        title: "",
        url: "",
        mainbody: "1",
        info: true
      },
      ue: null,
      ueId: `J_ueditorBox_${new Date().getTime()}`,
      ueContent: "",
      dialogVisible: false
    };
  },
  methods: {},
  mounted() {
    this.ue = ueditor.getEditor(this.ueId, {
      // serverUrl: '', // 服务器统一请求接口路径
      zIndex: 3000
    });
    console.log(this.$route.params);
  }
};
</script>

<style lang='scss' scope>
.sub_title {
  display: inline-block;
  font-weight: 700;
  font-style: normal;
  font-size: 18px;
  color: #333333;
  padding: 20px 0;
  margin: 20px 0;
  &.add_message {
    background: #f2f2f2;
    width: 100%;
    height: 42px;
    padding: 0;
    line-height: 42px;
    padding-left: 20px;
    font-size: 14px;
    border: 1px solid rgba(228, 228, 228, 1);
  }
}
.btn_group {
  margin-bottom: 20px;
}
</style>