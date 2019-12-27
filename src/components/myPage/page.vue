<template>
  <div id="MyPage">
    <Page
      :current="current"
      :page-size="currentPageSize"
      :total="total"
      :page-size-opts="pageSizeOpts"
      :show-sizer="showSizer"
      :show-total="showTotal"
      :show-elevator="showElevator"
      @on-change="onChange"
      @on-page-size-change="changePageSize"
      :ikey="ikey"
    ></Page>
  </div>
</template>
<script>
export default {
  name: "MyPage",
  props: {
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 30
    },
    pageSizeOpts: {
      type: Array,
      default() {
        return [5, 10, 20, 30, 100, 1000];
      }
    },
    showTotal: {
      type: Boolean,
      default: false
    },
    showElevator: {
      type: Boolean,
      default: false
    },
    showSizer: {
      type: Boolean,
      default: false
    },
    ikey: {
      // 唯一标识的ikey 可以不传
      type: String,
      default: ""
    }
  },
  data() {
    return {
      id: `myPage${Date.now()}`,
      // 这里仅仅只做每页条数的保存
      currentPageSize:
        Number(localStorage.getItem(`pageSize${this.$route.fullPath}${this.ikey}`)) || this.pageSize
    };
  },
  methods: {
    changePageSize(page) {
      localStorage.setItem(`pageSize${this.$route.fullPath}${this.ikey}`, page);
      this.$emit("changePageSize", page);
    },
    onChange(page) {
      this.$emit("onChange", page);
    }
  },
  watch: {},
  mounted() {
    this.changePageSize(this.currentPageSize);
  }
};
</script>
