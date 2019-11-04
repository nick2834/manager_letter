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
      <el-form-item label="执业证号：">
        <el-input v-model="lawForm.idcard" placeholder="请输入模板名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="审核状态：">
        <el-select v-model="lawForm.status" placeholder="请选择审核类型">
          <el-option label="通过" value="1"></el-option>
          <el-option label="不通过" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电话：">
        <el-input v-model="lawForm.phone" placeholder="请输入模板名称" clearable></el-input>
      </el-form-item>
      <!-- <el-form-item> -->
      <el-row :gutter="20" class="tool_bar">
        <el-col :span="12">
          <el-button type="primary" icon="el-icon-plus">新增</el-button>
          <el-button type="primary" icon="el-icon-upload2" @click="handleUpload">导入</el-button>
        </el-col>
        <el-col :span="12">
          <el-button type="primary">查询</el-button>
          <el-button>重置</el-button>
          <el-button type="primary">导出筛选列表</el-button>
        </el-col>
      </el-row>
      <!-- </el-form-item> -->
    </el-form>

    <el-table :data="dataList" style="width: 100%" border>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="序号" width="80"></el-table-column>
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column prop="agency" label="事务所" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="140"></el-table-column>
      <el-table-column prop="idCard" label="职业证号" :show-overflow-tooltip="true" width="180"></el-table-column>
      <el-table-column prop="address" label="地址" width="280"></el-table-column>
      <el-table-column prop="letter" label="授权委托" width="80">
        <template slot-scope="scope">
          <el-image
            style="width: 50px; height: 50px"
            :src="scope.row.letter[0]"
            :preview-src-list="scope.row.letter"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="审核状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status">通过</span>
          <el-button type="text" v-else @click.native="handleReview(scope.row)">待审核</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text">新增</el-button>
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

    <lawyer-dialog ref="lawyer" />
    <upload-dialog ref="upload" />
  </section>
</template>

<script>
import lawyerDialog from "./component/lawyerDialog";
import uploadDialog from "./component/uploadDialog";
export default {
  data() {
    return {
      lawForm: {
        name: "",
        agency: "",
        idcard: "",
        status: "",
        phone: ""
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0
    };
  },
  components: { lawyerDialog, uploadDialog },
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
        console.log(data);
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
    handleReview(row) {
      this.$refs.lawyer.init(row);
    },
    handleDel(e) {
      this.$confirm("确认删除该律师信息?", "提示", {
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