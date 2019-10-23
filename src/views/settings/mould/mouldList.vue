<!-- 模板列表 -->
<template>
  <section>
    <el-form :inline="true" :model="mouldForm" @keyup.enter.native="getDataList()">
      <el-form-item label="模板名称：">
        <el-input v-model="mouldForm.mouldName" placeholder="请输入模板名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="日期查询：">
        <el-date-picker
          v-model="mouldForm.searchDate"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button>重置</el-button>
      </el-form-item>
      <el-form-item></el-form-item>
    </el-form>
    <el-table :data="dataList" style="width: 100%" border>
      <el-table-column prop="id" label="序号" width="80"></el-table-column>
      <el-table-column prop="mouldType" label="模板类型" width="280"></el-table-column>
      <el-table-column prop="isDefault" label="默认函件" width="180">
        <template slot-scope="scope">
          <el-switch
            @change="changeDefault(scope.row)"
            v-model="scope.row.isDefault"
            active-color="#108ee9"
            class="switchStyle"
            active-text="开"
            inactive-text="关"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="createDate" label="创建时间" sortable width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small">查看</el-button>
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
      dataListLoading: false,
      mouldForm: {
        mouldName: "",
        searchDate: ""
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
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
        url: this.$http.adornUrl("/mould/list"),
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
    // 设置默认函件
    changeDefault(row) {
      console.log(row)
    }
  }
};
</script>
<style scoped>
</style>