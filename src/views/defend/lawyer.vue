<!-- 律师信息 -->
<template>
  <section class="lawyer_container">
    <el-form :inline="true" :model="lawForm" @keyup.enter.native="getDataList()">
      <el-form-item label="姓名：">
        <el-input v-model="lawForm.name" placeholder="请输入模板名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="事务所：">
        <el-input v-model="lawForm.agency" placeholder="请输入模板名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button>重置</el-button>
        <el-button type="primary">导出筛选列表</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="20" class="tool_bar">
      <el-row :span="24">
        <el-button type="primary" icon="el-icon-plus">新增</el-button>
        <el-button type="primary" icon="el-icon-upload2">导入</el-button>
      </el-row>
    </el-row>
    <el-table :data="dataList" style="width: 100%" border>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="序号" width="80"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="agency" label="事务所" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话" sortable width="180"></el-table-column>
      <el-table-column prop="address" label="地址" sortable width="280"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text">新增</el-button>
          <el-button type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
  </section>
</template>

<script>
export default {
  data() {
    return {
      lawForm: {
        name: "",
        agency: ""
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0
    };
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/defend/lawyer/list"),
        method: "get",
        params: this.$http.adornParams({
          page: this.pageIndex,
          limit: this.pageSize
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.page.list;
          this.totalPage = data.page.totalCount;
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    }
  }
};
</script>
<style scoped>
</style>