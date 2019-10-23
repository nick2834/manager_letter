<template>
  <section class="main-container">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="sub_title add_message">新增提醒</div>
        <ul class="add_message-box">
          <li>
            <div class="m_head">待处理侵权单</div>
            <div class="m_body">{{message.onpending}}</div>
          </li>
          <li>
            <div class="m_head">新消息</div>
            <div class="m_body">{{message.newMsg}}</div>
          </li>
        </ul>
      </el-col>
      <el-col :span="24">
        <span class="sub_title">消息</span>
        <el-table :data="dataList" style="width: 100%" border :header-cell-style="{background:'#f2f2f2',color:'#606266'}">
          <el-table-column prop="createTime" label="消息时间" width="180"></el-table-column>
          <el-table-column prop="source" label="来源" width="180"></el-table-column>
          <el-table-column prop="article" label="地址" width="300"></el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              {{scope.row.status? '已删除':'未删除'}}
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24">
        <div class="tort_title">
          <span class="sub_title">各平台侵权数</span>
          <div class="tort_sort">
            <div class="sort_span">
              <span>今日</span>
              <span>本周</span>
              <span>本月</span>
              <span>全年</span>
            </div>
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <span class="sub_title">侵权数</span>
        <div id="chartBarBox" class="chart-box"></div>
      </el-col>
      <el-col :span="4">
        <span class="sub_title">侵权文章排名</span>
        <ul class="tort_rank">
          <li v-for="(item,index) in tortArticleList" :key="index">
            <span class="num_index" :class="index < 3 ?'num_index-top':'num_index-end'">{{index+1}}</span>
            <span class="company">{{item.company}}</span>
            <span class="num">{{item.num}}</span>
          </li>
        </ul>
      </el-col>
      <el-col :span="12">
        <div class="sub_title">平台侵权数据</div>
      </el-col>
      <el-col :span="12">
        <div class="sub_title">本月数据近况</div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      dataList: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      tortArticleList: [
        { company: "今日头条", num: 23 },
        { company: "搜狐网", num: 12 },
        { company: "网易新闻", num: 10 },
        { company: "新浪财经", num: 8 },
        { company: "凤凰新闻", num: 6 },
        { company: "百度百家", num: 3 },
        { company: "知乎", num: 2 }
      ],
      message:{},
      activeName: "first",
      chartBar: null,
      value1: ""
    };
  },
  mounted() {
    this.getDataList();
    this.initChartBar();
  },
  activated() {
    if (this.chartBar) {
      this.chartBar.resize();
    }
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/dash/message/data"),
        method: "get",
        params: this.$http.adornParams({
          page: this.pageIndex,
          limit: this.pageSize
        })
      }).then(({ data }) => {
        console.log(data)
        if (data && data.code === 0) {
          this.dataList = data.page.list;
          this.totalPage = data.page.totalCount;
          this.message = data.page.message;
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      });
    },
    // 柱状图
    initChartBar() {
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        color: ["rgba(24,144,255,0.85)"],
        xAxis: {
          type: "category",
          data: [
            "01月",
            "02月",
            "03月",
            "04月",
            "05月",
            "06月",
            "07月",
            "08月",
            "09月",
            "10月",
            "11月",
            "12月"
          ],
          axisLine: {
            lineStyle: {
              // color: "#f0f2f5",
              width: 1 //这里是为了突出显示加上的
            }
          }
        },
        yAxis: {
          type: "value",
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed"
            }
          }
        },
        series: [
          {
            barWidth: 25, // 柱图宽度
            barMaxWidth: 25, // 最大宽度
            data: [120, 200, 150, 80, 70, 110, 130, 110, 123, 323, 434, 11],
            type: "bar"
          }
        ]
      };
      this.chartBar = echarts.init(document.getElementById("chartBarBox"));
      this.chartBar.setOption(option);
      window.addEventListener("resize", () => {
        this.chartBar.resize();
      });
    }
  }
};
</script>

<style lang="scss">
.main-container {
  line-height: 1.5;
  .sub_title {
    display: inline-block;
    font-weight: 700;
    font-style: normal;
    font-size: 18px;
    color: #333333;
    padding: 20px 0;
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
  .add_message-box {
    margin-top: 10px;
    li {
      width: 145px;
      height: 90px;
      border: 1px solid rgba(228, 228, 228, 1);
      text-align: center;
      display: inline-block;
      margin-right: 10px;
      .m_head {
        background: #f2f2f2;
        height: 32px;
        line-height: 32px;
      }
      .m_body {
        font-size: 36px;
        font-weight: bold;
      }
    }
  }
  .chart-box {
    min-height: 300px;
  }
  .tort_title {
    border-bottom: 1px solid #ebeef5;
    line-height: 40px;
    margin-top: 20px;
    padding-left: 10px;
    overflow: hidden;
    .sub_title {
      padding: 10px 20px;
      border-bottom: 2px solid #108ee9;
      color: #108ee9;
      display: inline-block;
      font-size: 16px;
    }
    .tort_sort {
      float: right;
      .sort_span{
        display: inline-block;
        span{
          cursor: pointer;
          padding: 0 10px;
          &:hover{
            color: #108ee9;
          }
        }
      }
    }
  }
  .tort_rank {
    li {
      width: 100%;
      position: relative;
      margin-bottom: 20px;
      span {
        display: inline-block;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.647);
        &.num_index {
          width: 20px;
          height: 20px;
          border-radius: 20px;
          background: #f0f2f5;
          position: absolute;
          left: 0;
          color: #314659;
          text-align: center;
          &-top {
            background: #314659;
            color: #ffffff;
          }
        }
        &.company {
          padding: 0 25px 0 35px;
        }
        &.num {
          position: absolute;
          right: 0;
        }
      }
    }
  }
}
</style>

