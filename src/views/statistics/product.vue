<!-- 数据统计 -->
<template>
  <section class="count_container">
    <el-form :inline="true" :model="statisticsForm" @keyup.enter.native="getDataList()">
      <el-form-item label="产品类别：">
        <el-input v-model="statisticsForm.types" placeholder="请输入模板名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-radio-group v-model="mounthFilter" size="medium" style="margin-bottom:20px">
          <el-radio-button label="today">今日</el-radio-button>
          <el-radio-button label="week">本周</el-radio-button>
          <el-radio-button label="month">本月</el-radio-button>
          <el-radio-button label="year">年</el-radio-button>
          <el-radio-button label="all">全部</el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="12" v-if="totalData" style="padding-top:10px;text-align:right">
        <span class="statistic_span">侵权数：{{totalData.tort}}</span>
        <span class="statistic_span">发函数：{{totalData.send}}</span>
        <span class="statistic_span">删除数：{{totalData.del}}</span>
        <span class="statistic_span">删除率：{{totalData.rate | countCompute}}</span>
      </el-col>
    </el-row>

    <el-table :data="dataList" style="width: 100%" border>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="序号" width="80"></el-table-column>
      <el-table-column prop="category" label="产品类别" width="180"></el-table-column>
      <el-table-column prop="tortnumber" label="侵权数" width="350"></el-table-column>
      <el-table-column prop="sendnumber" label="发函数" sortable width="180"></el-table-column>
      <el-table-column prop="delnumber" label="删除数" sortable width="180"></el-table-column>
      <el-table-column prop="delrate" label="删除率" sortable width>
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.delrate | countCompute}}</span>
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
      statisticsForm: {
        types: "",
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
      mounthFilter: "today",
      dataList: [],
      totalData: {},
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0
    };
  },
  watch: {
    mounthFilter(val) {
      this.getDataList(val);
    }
  },
  filters: {
    countCompute(val) {
      return Number(val).toFixed(2) + "%";
    }
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/statistics/product/list"),
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
          this.totalData = data.page.totalData;
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
<style scoped lang="scss">
.statistic_span{
  padding: 10px 12px;
  font-size: 14px;
  color: #999999;
  line-height: 14px;
}
</style>