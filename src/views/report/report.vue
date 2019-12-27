<template>
  <div id="report">
    <Card>
      <div class="head">
        <div>
          <ButtonGroup class="mr10">
            <Button :type="curType === 'day' ? 'primary' : 'default'" @click="changeType('day')"
              >天</Button
            >
            <Button :type="curType === 'week' ? 'primary' : 'default'" @click="changeType('week')"
              >周</Button
            >
            <Button :type="curType === 'month' ? 'primary' : 'default'" @click="changeType('month')"
              >月</Button
            >
          </ButtonGroup>
          <span>日期:</span>
          <DatePicker
            v-model="query.dateValue"
            type="daterange"
            placement="bottom-end"
            placeholder="Select date"
            style="width: 300px"
            :options="dataOptions"
            format="yyyy-MM-dd"
            @on-change="search"
          ></DatePicker>
        </div>
        <!-- <div>
          <Button type="primary" @click="search">查询</Button>
        </div> -->
      </div>
    </Card>
    <Card>
      <ReportEhart style="height: 310px;" :data="echartData" v-if="echartData && echartData.x" />
    </Card>
    <list-page
      :columns="columns"
      :data="data.data"
      :loading="loading"
      @get-list="getList"
      style="margin-top:10px"
    >
    </list-page>
  </div>
</template>

<script>
import ListPage from "_c/listPage";
// import { ChartBar } from "_c/charts";
import dayjs from "dayjs";
import ReportEhart from "./report-chart";
import columns from "./columns";

const initQuery = {
  dateValue: ""
};

function setDataOptions(num) {
  return function(data) {
    const now = dayjs();
    const prevMonth = now.subtract(num, "month");
    const res = dayjs(data).isBetween(prevMonth, now);
    return !res;
  };
}
export default {
  name: "report",
  components: {
    ListPage,
    ReportEhart
  },
  created() {
    this.$set(this.query, "dateValue", this.initQueryTime(1));
    this.init();
  },
  data() {
    return {
      curType: "day",
      echartData: null,
      data: {
        data: []
      },
      columns: [],
      loading: true,
      query: JSON.parse(JSON.stringify(initQuery)),
      dataOptions: {
        // disabledDate: setDataOptions(1)
      }
    };
  },
  watch: {
    curType(type) {
      const num = {
        // 当按【天】查看，只支持选择跨度1个月的区间
        day: 1,
        // 当按【周】查看，只支持选择跨度6个月的区间
        week: 6,
        // 当按【月】查看，只支持选择跨度24个月的区间
        month: 24
      }[type];
      // this.$set(this.dataOptions, "disabledDate", setDataOptions(num));
      // this.$set(this.query, "dateValue", this.initQueryTime(num));
      this.getList();
    }
  },
  methods: {
    changeType(type) {
      this.curType = type;
    },
    fmtChartData({ xAxis, yAxis }) {
      const iosData = [];
      const andrData = [];
      const webData = [];
      const adminData = [];
      const totalData = [];
      Object.values(xAxis).map(item => {
        const { ios, andr, web, admin, total } = yAxis[item];
        iosData.push(ios);
        andrData.push(andr);
        webData.push(web);
        adminData.push(admin);
        totalData.push(total);
      });
      return {
        x: Object.values(xAxis),
        y: {
          iosData,
          andrData,
          webData,
          adminData,
          totalData
        }
      };
    },
    initQueryTime(num) {
      const now = this.$dayjs();
      const start = now.subtract(num, "month").$d;
      const end = now.$d;
      return [start, end];
    },
    init() {
      this.columns = columns.call(this);
      this.getList();
    },
    formatQuery() {
      const [startDate, endDate] = this.query.dateValue;
      const start = this.$dayjs(startDate)
        .set("hours", 0)
        .set("minute", 0)
        .set("second", 0).$d;
      const end = this.$dayjs(endDate)
        .set("hours", 23)
        .set("minute", 59)
        .set("second", 59).$d;
      const data = {
        ...this.query,
        stTime: startDate ? parseInt(new Date(start).getTime() / 1000) : "",
        endTime: endDate ? parseInt(new Date(end).getTime() / 1000) : "",
        type: this.curType
      };
      delete data.dateValue;
      return data;
    },
    getList() {
      const data = {
        ...this.formatQuery()
      };
      this.loading = true;
      this.$Http
        .get(this.$ApiList.chart, data)
        .then(res => {
          this.loading = false;
          console.log(Object.assign(res.data.sum, { date: "汇总" }));
          const list = res.data.list.concat([Object.assign(res.data.sum, { date: "汇总" })]);
          this.$set(this.data, "data", list);
          this.echartData = this.fmtChartData(res.data);
        })
        .finally(e => {
          this.loading = false;
        });
    },
    search() {
      this.getList();
      // console.log("search");
    }
  }
};
</script>
<style lang="less">
#report {
  overflow: auto;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .mr10 {
    margin-right: 10px;
  }
  .head {
    display: flex;
    // justify-content: space-between;
    flex-wrap: wrap;
    > div {
      margin: 10px;
      > span {
        padding-right: 5px;
        font-size: 14px;
      }
    }
  }
}
</style>
