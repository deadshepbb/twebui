<template>
  <div class="perfSearch">
    <div class="comhead">
      <div class="con-index">
        <div class="l">
          <div class="mr-20 ">
            <span>斐波那契数列查询前几个数的和</span>
            <el-input @input="(val)=>{numNameInput = val.replace(/[^\d]/g, '')}" v-model="numNameInput" size="mini"
              placeholder="斐波那契数列查询" style="width:180px"></el-input>
            <el-button type="primary" size="mini" @click="getRecursive">查询</el-button>
          </div>
        </div>
      </div>
    </div>

  </div>
  </div>
</template>
<script>
  import {
    getRecursive
  } from '../../api/fbSearch.js';

  export default {
    components: {},

    methods: {
      getRecursive() {
        let param = {
          "num": this.numNameInput // 5
        };
        getRecursive(param).then((res) => {
          if (res.code == 200) {
            this.$message.success(res);
          }
        })
      }
    },

    data() {
      return {
        numNameInput: 5
      };
    },

    created() {},
    mounted() {}
  };
</script>

<style scoped lang="scss">
  .comhead {
    position: relative;
    align-items: center;
    padding: 10px;
    background-color: #3956b2;
    color: #fff;

    .select-wrap1 {
      display: flex;
      justify-content: space-between;
    }

    .left {
      display: flex;
      align-items: center;

      .datePick {
        height: 26px;
      }
    }

    .right {
      display: flex;
      align-items: center;
    }
  }

  .perfSearch /deep/ {
    height: 100%;
    min-width: 1348px;

    .container {
      display: flex;

      .con-left {
        width: 40%;
        height: 98%;
        display: flex;
        flex-direction: column;
        background-color: #ffffff;
        margin: 10px 10px 0 0;
        padding: 10px;

        .net-tab {
          height: calc(100% - 0px);

          .net-tab-left {
            float: left;
            height: 100%;
            width: 30%;
            border-right: 1px solid #e1e1e1;

            .m-20 {
              margin: 20px 20px 0 20px;
            }
          }
        }

        .localstyle {
          padding: 4px 0;
        }
      }

      .con-right {
        width: 60%;
        height: 98%;
        display: flex;
        flex-direction: column;
        background-color: #ffffff;
        margin: 10px 0 0 0;
        padding: 10px;

        .el-tab-pane {
          height: calc(100% - 0px);
        }

        .el-tabs__content {
          height: calc(100% - 39px);
          padding: 0;
        }
      }
    }

    .template {
      position: absolute;
      left: 0;
      right: 0px;
      z-index: 10;
      display: flex;
      height: calc(100% - 77px);
      margin-top: 10px;
      background-color: #fff;

      #whole-bottom-table {
        height: calc(100% - 49px);
      }

      .el-tabs__content {
        height: calc(100% - 39px);
        background: #fff;
      }
    }
  }

  .templateWrap {
    display: flex;
    justify-content: space-between;
    padding: 10px;

    .l {
      display: flex;
    }

    .input-suffix {
      display: flex;
    }
  }

  .con-index {
    display: flex;
    justify-content: space-between;
    padding: 5px 20px 5px 5px;
  }

  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 120px;
  }

  .el-radio-button__inner {
    border-radius: 0;
  }

  .el-tabs--border-card>.el-tabs__content {
    padding: 0px;
    height: calc(100% - 38px);
    overflow: auto;
  }

  .el-table::before {
    height: 0;
  }

  .el-table__fixed-right::before,
  .el-table__fixed::before {
    height: 0;
  }

  .el-input__icon {
    line-height: normal;
  }

  .el-table__header-wrapper {
    height: auto !important;
  }

  .s-title {
    padding: 5px 0;
  }

  .el-tabs--border-card {
    height: 100%;
    box-shadow: none;
  }

  // 导出
  .export-bottom-table {
    width: 70px;
    height: 28px;
    line-height: 28px;
    background-color: #5a9af4;
    color: #fff;
    text-align: center;
    cursor: pointer;
    border-radius: 3px;
    position: absolute;
    right: 13px;
    top: 6px;
    z-index: 10;
  }

  .timeBtn {
    text-align: center;
    padding: 18px 0 0 0;
  }
</style>

<style>
  .el-tree>.el-tree-node {
    min-width: 100%;
    display: inline-block;
  }

  .timePopper .el-tabs__nav {
    width: 100% !important;
  }

  .timePopper .el-tabs__item {
    width: 33%;
    text-align: center;
  }

  .timePopper .el-input__icon {
    line-height: 21px;
  }

  .timePopper .el-range-separator {
    line-height: 20px;
  }

  .el-tab-pane {
    height: 100%;
  }

  .el-dialog__body {
    padding: 0 10px;
    border: 1px solid #e1e1e1;
  }

  .el-form-item {
    margin-bottom: 5px;
  }

  .el-dialog__header {
    padding: 10px 10px 10px;
    background-color: #ebeef5;
  }

  .el-dialog__title {
    line-height: 24px;
    font-size: 16px;
    color: #666;
  }

  .el-dialog__headerbtn {
    top: 10px;
  }

  body .el-table::before {
    z-index: inherit;
  }

  .el-checkbox__label {
    font-size: 12px !important;
  }
</style>
