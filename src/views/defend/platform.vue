<!-- 平台信息 -->
<template>
  <section class="lawyer_container">
    <el-form :inline="true" :model="platFormData" @keyup.enter.native="getDataList()">
      <el-form-item label="公司名称：">
        <el-input v-model="platFormData.company" placeholder="请输入模板名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="网络平台：">
        <el-input v-model="platFormData.platform" placeholder="请输入模板名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button>重置</el-button>
        <el-button type="primary">导出筛选列表</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="20" class="tool_bar">
      <el-row :span="24">
        <el-button type="primary" icon="el-icon-plus" @click="handleAddCom">新增</el-button>
        <el-button type="primary" icon="el-icon-upload2" @click="handleUpload">导入</el-button>
      </el-row>
    </el-row>
    <el-table :data="dataList" style="width: 100%" border>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="序号" width="80"></el-table-column>
      <el-table-column prop="company" label="公司名称" width="280"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="280"></el-table-column>
      <el-table-column prop="platform" label="网络平台" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click.native="handleAdd(scope.row)">新增</el-button>
          <el-button type="text">查看</el-button>
          <el-button type="text" @click.native="handleDel(scope.row)">删除</el-button>
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

    <platform-dialog ref="platform" />
    <company-dialog ref="company" />
    <upload-dialog ref="upload" />
  </section>
</template>

<script>
import platformDialog from "./component/platformDialog";
import companyDialog from "./component/companyDialog";
import uploadDialog from "./component/uploadDialog";
export default {
  data() {
    return {
      platFormData: {
        company: "",
        platform: ""
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0
    };
  },
  components: { platformDialog, companyDialog, uploadDialog },
  mounted() {
    this.getDataList();
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/defend/platform/list"),
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
    },
    // 上传
    handleUpload() {
      this.$refs.upload.init();
    },
    //新增公司
    handleAddCom(){
      this.$refs.company.init();
    },
    // 新增平台
    handleAdd(e) {
      console.log(e)
      this.$refs.platform.init(e);
    },
    handleDel(e) {
      this.$confirm("确认删除该平台信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style scoped>
</style>