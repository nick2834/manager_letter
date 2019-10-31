<!-- 短信接口 -->
<template>
  <el-form ref="form" :model="sizeForm" label-position="top">
    <el-form-item label="短信功能开关：">
      <el-col :span="6">
        <el-switch
          v-model="sizeForm.isOpen"
          active-color="#108ee9"
          class="switchStyle"
          active-text="开"
          inactive-text="关"
        ></el-switch>
      </el-col>
    </el-form-item>
    <el-form-item label="短信接口地址：">
      <el-col :span="6">
        <el-input v-model="sizeForm.name"></el-input>
        <div class="sub_title">由短信运营服务商提供，如：http://www.baidu.com</div>
      </el-col>
    </el-form-item>
    <el-form-item label="短信账号：">
      <el-col :span="6">
        <el-input v-model="sizeForm.name"></el-input>
        <div class="sub_title">由短信运营服务商提供</div>
      </el-col>
    </el-form-item>
    <el-form-item label="短信密码：">
      <el-col :span="6">
        <el-input v-model="sizeForm.name"></el-input>
        <div class="sub_title">由短信运营服务商提供</div>
      </el-col>
    </el-form-item>
    <el-form-item label="测试接收手机号：">
      <el-row :gutter="12">
        <el-col :span="6">
          <el-input v-model="sizeForm.name"></el-input>
          <div class="sub_title">仅用于测试短信接口配置是否正确 非必填</div>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">发送测试短信</el-button>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item size="large">
      <el-button type="primary" @click="onSubmit">确认保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      sizeForm: {
        name: "",
        isOpen: false
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>
<style scoped>
</style>