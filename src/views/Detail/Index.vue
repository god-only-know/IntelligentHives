<template>
  <div class="detail-panel">
    <div class="detail-half">
      <chart
        title="蜂箱温度变化"
        :loading="loading.temperature"
        :chartData="chartData.temperature"
        @search="getTemperatureChartData"
      ></chart>
    </div>
    <div class="detail-half">
      <chart
        title="蜂箱重量/框变化"
        :loading="loading.weight"
        :chartData="chartData.weight"
        @search="getWeidhtChartData"
      ></chart>
    </div>
    <div class="detail-bottom">
      <chart
        title="蜂箱重量率变化"
        :loading="loading.rate"
        :chartData="chartData.rate"
        @search="getRateChartData"
      ></chart>
    </div>
  </div>
</template>

<script>
import Chart from "./Chart/Index.vue";
export default {
  data() {
    return {
      device: {},
      chartData: {
        temperature: {
          columns: [],
          rows: []
        },
        weight: { columns: [], rows: [] },
        rate: { columns: [], rows: [] }
      },
      loading: {
        temperature: false,
        weight: false,
        rate: false
      }
    };
  },
  created() {
    this.device = this.$route.query;
  },
  methods: {
    async getTemperatureChartData(dateRange) {
      this.loading.temperature = true;
      let res = await this.$API.getTemperatureData({
        serialNum: this.device.serialnum,
        startTime: dateRange[0],
        endTime: dateRange[1]
      });
      if (res.code === 0) {
        const r = new Map();
        this.chartData.temperature = {
          columns: ["时间", "温度"],
          rows: res.data
            .filter(arr => !r.has(arr.time) && r.set(arr.time, 1))
            .map(item => ({
              温度: item.temperature,
              时间: item.time
            }))
        };
      }
      this.loading.temperature = false;
    },
    async getWeidhtChartData(dateRange) {
      this.loading.weight = true;
      let res = await this.$API.getWeightData({
        serialNum: this.device.serialnum,
        startTime: dateRange[0],
        endTime: dateRange[1]
      });
      if (res.code === 0) {
        const r = new Map();
        this.chartData.weight = {
          columns: ["时间", "重量"],
          rows: res.data
            .filter(arr => !r.has(arr.time) && r.set(arr.time, 1))
            .map(item => ({
              温度: item.temperature,
              时间: item.time
            }))
        };
      }
      this.loading.weight = false;
    },
    async getRateChartData(dateRange) {
      this.loading.rate = true;
      let res = await this.$API.getRateData({
        serialNum: this.device.serialnum,
        startTime: dateRange[0],
        endTime: dateRange[1]
      });
      if (res.code === 0) {
        const r = new Map();
        this.chartData.rate = {
          columns: ["时间", "变化率"],
          rows: Array.from(
            new Set(
              res.data
                .filter(arr => !r.has(arr.time) && r.set(arr.time, 1))
                .map(item => ({
                  变化率: item.rateOfChange,
                  时间: item.time
                }))
            )
          )
        };
      }
      this.loading.rate = false;
    }
  },
  components: {
    Chart
  }
};
</script>

<style lang="scss" scoped>
.detail-panel {
  display: flex;
  flex-wrap: wrap;
  .detail-half {
    width: calc(50% - 22px);
    margin-top: 15px;
  }
  .detail-half:first-child {
    margin-left: 15px;
    margin-right: 15px;
  }

  .detail-bottom {
    width: calc(100% - 30px);
    margin-left: 15px;
    margin-top: 15px;
    .el-card {
      height: calc(100% - 15px);
    }
  }
  .el-card {
    height: 100%;
  }
}
</style>
