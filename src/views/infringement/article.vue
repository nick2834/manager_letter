<template>
  <section class="main-container">
    <el-form :inline="true" :model="articleForm" @keyup.enter.native="getDataList()">
      <el-form-item label="文章标题：">
        <el-input v-model="articleForm.title" placeholder="请输入文章标题" clearable></el-input>
      </el-form-item>
      <el-form-item label="状态：">
        <el-select v-model="articleForm.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发函时间：">
        <el-date-picker
          v-model="articleForm.sendDate"
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
    <el-row :gutter="24" class="tool_bar">
      <el-col :span="12">
        <el-dropdown split-button type="primary" @command="handleClick">
          批量操作
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="delete">删除</el-dropdown-item>
            <el-dropdown-item command="export">导出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button type="primary" icon="el-icon-plus">新增</el-button>
        <el-button type="primary" icon="el-icon-upload2" @click="handleUpload">导入</el-button>
      </el-col>
      <!-- <el-col :span="12">
        <el-button type="primary" icon="el-icon-upload2">导入</el-button>
      </el-col>-->
    </el-row>
    <el-table :data="dataList" style="width: 100%" border>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="序号" width="80"></el-table-column>
      <el-table-column prop="title" :show-overflow-tooltip="true" label="文章标题" width="200"></el-table-column>
      <el-table-column prop="author" label="作者账号" width="140"></el-table-column>
      <el-table-column prop="url" :show-overflow-tooltip="true" label="文章链接" width="180">
        <template slot-scope="scope">
          <el-link>{{scope.row.url}}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="platform" label="网络平台" width="140"></el-table-column>
      <el-table-column prop="createtime" label="发布时间" sortable width="180"></el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        :filters="[{text:'已删除',value:true},{text:'未删除',value:false}]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
        min-width="120"
      >
        <template slot-scope="scope">
          <span
            class="status_idot"
            :class="scope.row.status? 'status_idot-del':'status_idot-undel'"
          >{{scope.row.status ? '已删除' : '未删除'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="160">
        <template slot-scope="scope">
          <el-button type="text">查看</el-button>
          <el-button type="text" :disabled="scope.row.status">发函</el-button>
          <!-- <el-button type="text">删除</el-button> -->
          <el-button type="text" @click="handleLawyer(scope.row)">转律师</el-button>
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
import { formatJson,deepClone } from "@/utils";
import lawyerDialog from "./component/lawyerDialog";
import uploadDialog from "./component/uploadDialog";
export default {
  data() {
    return {
      articleForm: {
        title: "",
        region: "",
        sendDate: ""
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
  components: { lawyerDialog, uploadDialog },
  mounted() {
    this.getDataList();
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/article/list"),
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
    filterTag(value, row) {
      return row.status === value;
    },
    handleUpload() {
      this.$refs.upload.init();
    },
    //转律师
    handleLawyer(e) {
      console.log(e);
      this.$refs.lawyer.init(e);
    },
    handleClick(e) {
      if (e == "export") {
        import("@/vendor/Export2Excel").then(excel => {
          const tHeader = [
            "Id",
            "文章标题",
            "作者账号",
            "网络平台",
            "文章链接",
            "发布时间",
            "发布状态"
          ];
          const filterVal = [
            "id",
            "title",
            "author",
            "platform",
            "url",
            "createtime",
            "status"
          ];
          const list = deepClone(this.dataList);
          list.map(item => {
            item.status ? (item.status = "已删除") : (item.status = "未删除");
          });
          const data = formatJson(filterVal, list);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename,
            autoWidth: this.autoWidth,
            bookType: this.bookType
          });
        });
      }
    }
  }
};
</script>

<style lang="scss">
.main-container {
  line-height: 1.5;
  .tool_bar {
    margin-bottom: 20px;
  }
  .status_idot {
    position: relative;
    padding: 0 10px;
    &::before {
      position: absolute;
      left: 0;
      top: 50%;
      content: "";
      width: 4px;
      height: 4px;
      border-radius: 50%;
    }
    &-undel {
      color: green;
      &::before {
        background: green;
      }
    }
    &-del {
      color: red;
      &::before {
        background: red;
      }
    }
  }
}
</style>

