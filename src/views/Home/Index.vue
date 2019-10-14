<template>
  <div
    class="hondy-comb-panel"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="hondy-comb-list">
      <honey-comb
        v-for="(item, index) in deviceList"
        :key="index"
        :device="item"
      ></honey-comb>
    </div>
    <div class="block">
    <el-pagination
       background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @prev-click="getFront"
      @next-click="getNext"
      :current-page="pageNum"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="float:right;margin:0 30px 30px 0px">
    </el-pagination>
  </div>
  </div>
</template>

<script>
import HoneyComb from "@/views/Home/Honeycomb/Index.vue";
import bus from "@/utils/bus";
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      deviceList: [],
      loading: false,
      total: 0,
    };
  },
  created() {
    this.getPageList();

    bus.$on("refresh", () => {
      this.getPageList();
    });
  },
  methods: {
    async getPageList() {
      this.loading = true;
      let res = await this.$API.getPageDevice({
        pageNum: this.pageNum,
        pageSize: this.pageSize
      });
      if (res.code === 0) {
        this.deviceList = res.data;
        this.total = res.total;
      }
      this.loading = false;
    },
    handleCurrentChange: function(val) {
        this.pageNum = val;
        this.getPageList();
    },
    handleSizeChange: function(val) {
        this.pageSize = val;
        this.pageNum  = 1;
        this.getPageList();
    },
    getFront() {
        this.pageNum -= 1; 
    },
    getNext() {
        this.pageNum += 1; 
    }
  },
  components: {
    HoneyComb
  }
};
</script>

<style lang="scss" scoped>
.hondy-comb-panel {
}
.hondy-comb-list {
  display: flex;
  flex-wrap: wrap;
  margin: 30px;
  > div {
    width: 30%;
    min-width: 355px;
    margin: 10px 1.5%;
    overflow: visible;
  }
}
</style>
