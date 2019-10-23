<!-- 模板编辑 -->
<template>
  <section>
    <el-form :inline="true" :model="mouldForm" @keyup.enter.native="getDataList()">
      <el-form-item label="模板类型">
        <el-select v-model="mouldForm.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="日期查询：">
        <el-date-picker
          v-model="value2"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item> -->
      <el-form-item></el-form-item>
    </el-form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      mouldForm: {
        region: ""
      },
      mouldData:{
          type:"",
          layerTypes:{
              names:{
                  title:"#律师名称#",
                  value:""
              },
              phone:{
                  title:"#律师电话#",
                  value:""
              }
          }
      }
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {}
};
</script>
<style scoped>
</style>