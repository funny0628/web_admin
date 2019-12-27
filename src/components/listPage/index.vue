<!-- 这个是 table 加 list 的功能 主要针对 赛事管理 的已结算和操作记录  布局的风格都是一样的  -->

<template>
  <Card>
    <slot name="info"></slot>
    <div class="list-page">
      <Table
        :columns="columns"
        :data="data"
        :stripe="stripe"
        border
        class="custom"
        :loading="loading"
        @on-sort-change="
          column => {
            if (column.key === 'normal') return;
            $emit('on-sort-change', column);
          }
        "
      ></Table>
      <Page
        v-if="page"
        :total="page.total"
        :current="page.page"
        :pageSize="page.pagesize"
        showTotal
        showElevator
        showSizer
        @changePageSize="changePageSize"
        @onChange="change"
        style="text-align: right;margin-top:10px"
      ></Page>
    </div>
  </Card>
</template>

<script>
import Page from "_c/myPage/page";

export default {
  components: {
    Page
  },
  props: {
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    loading: {
      type: Boolean,
      default() {
        return false;
      }
    },
    page: {
      type: Object,
      default() {
        return null;
      }
    },
    stripe: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    changePageSize(e) {
      this.page.page = 1;
      this.page.pagesize = e;
      this.getList();
    },
    change(e) {
      this.page.page = e;
      this.getList();
    },
    getList() {
      this.$emit("get-list");
    }
  }
};
</script>

<style lang="less" scoped>
// .list-page {
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   /deep/ .custom.ivu-table-wrapper {
//     flex: 1;
//     // overflow-y: scroll;
//     // height: 100px;
//     .ivu-table {
//       width: unset;
//       overflow-y: auto;
//       // display: flex;
//       // flex-direction: column;
//     }
//   }
//   /deep/ .ivu-table-body.ivu-table-overflowY,
//   /deep/ .ivu-table-tip table {
//     height: 100% !important;
//   }
//   /deep/ .ivu-table-tip {
//     height: ~"calc(100% )" !important;
//   }
//   //  /deep/ .ivu-table-tip
//   /deep/ .ivu-table-body {
//     overflow: hidden;
//     margin-top: 40px;
//   }
//   /deep/ .ivu-table-header {
//     position: absolute; // 给thead定位  然后给tbody一个margin-top
//   }
// }
/deep/ .ivu-table-cell {
  // padding: 0 8px !important;
}
</style>
