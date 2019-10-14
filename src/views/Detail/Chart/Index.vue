<template>
  <el-card
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div slot="header">
      {{ title }}
    </div>
    <div class="selector">
      <el-date-picker
        v-model="dateRange"
        type="datetimerange"
        :picker-options="pickerOptions"
        value-format="yyyy-MM-dd HH:mm:ss"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
    </div>
    <ve-line
      :data="chartData"
      :mark-line="markLine"
      :mark-point="markPoint"
      :data-zoom="dataZoom"
    ></ve-line>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      dateRange: [
        (() => {
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30 * 1);
          return start.Format("yyyy-MM-dd HH:mm:ss");
        })(),
        new Date().Format("yyyy-MM-dd HH:mm:ss")
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit("pick", [start, end]);
            }
          },
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
          }
        ]
      },
      markLine: {
        data: [
          {
            name: "平均线",
            type: "average"
          }
        ]
      },
      markPoint: {
        data: [
          {
            name: "最大值",
            type: "max"
          }
        ]
      },
      dataZoom: [
        {
          type: "slider",
          start: 0,
          end: 20
        }
      ]
    };
  },
  created() {
    this.$emit("search", this.dateRange);
  },
  props: {
    title: String,
    chartData: {
      type: Object,
      default: () => ({})
    },
    loading: Boolean
  },
  watch: {
    dateRange(value) {
      this.$emit("search", value);
    }
  }
};
</script>

<style lang="scss" scoped>
.selector {
  overflow: hidden;
  .el-date-editor {
    float: right;
  }
}
.ve-line {
  margin-top: 15px;
}
</style>
