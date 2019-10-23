<!-- 模板设置 -->
<template>
  <section class="section_container">
    <el-tabs type="border-card">
      <el-tab-pane label="模板列表">
        <mould-list />
      </el-tab-pane>
      <el-tab-pane label="模板编辑">
          <mould-edit />
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script>
import mouldList from "./mould/mouldList";
import mouldEdit from "./mould/mouldEdit";
export default {
  data() {
    return {
      content:{
          company:{
              title:"#公司名称#",
              value:""
          }
      }
    };
  },
  components: {
    mouldList,mouldEdit
  },
  methods: {
    getDataList(e) {}
  }
};
</script>
<style scoped>
</style>