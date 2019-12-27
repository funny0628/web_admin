<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from "echarts";
import { on, off } from "@/utils/index";

export default {
  name: "serviceRequests",
  props: {
    data: {
      type: Object,
      default() {
        return null;
      }
    }
  },
  data() {
    return {
      dom: null
    };
  },
  watch: {
    data: {
      handler(v) {
        this.getData(v);
      },
      deep: true
    }
  },
  methods: {
    resize() {
      this.dom.resize();
    },
    getData({ x, y: { iosData, andrData, webData, adminData, totalData } }) {
      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        grid: {
          top: "3%",
          left: "1.2%",
          right: "1%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: x
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "iOS",
            type: "line",
            stack: "总量",
            areaStyle: {
              normal: {
                color: "#2d8cf0"
              }
            },
            data: iosData
          },
          {
            name: "Android",
            type: "line",
            stack: "总量",
            areaStyle: {
              normal: {
                color: "#10A6FF"
              }
            },
            data: andrData
          },
          {
            name: "web",
            type: "line",
            stack: "总量",
            areaStyle: {
              normal: {
                color: "#0C17A6"
              }
            },
            data: webData
          },
          {
            name: "后台添加",
            type: "line",
            stack: "总量",
            areaStyle: {
              normal: {
                color: "#4608A6"
              }
            },
            data: adminData
          }
          // {
          //   name: "全部",
          //   type: "line",
          //   stack: "总量",
          //   label: {
          //     normal: {
          //       show: true,
          //       position: "top"
          //     }
          //   },
          //   areaStyle: {
          //     normal: {
          //       color: "#398DBF"
          //     }
          //   },
          //   data: totalData
          // }
        ]
      };
      this.$nextTick(() => {
        this.dom = echarts.init(this.$refs.dom);
        this.dom.setOption(option);
        on(window, "resize", this.resize);
      });
    }
  },
  mounted() {
    console.log("data", this.data);
    this.getData(this.data);
  },
  beforeDestroy() {
    off(window, "resize", this.resize);
  }
};
</script>
