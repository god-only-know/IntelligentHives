<template>
  <el-card shadow="hover" class="honey-comb" :body-style="{ padding: '0px' }">
    <div class="hondy-comb-body" @click="handleDetail">
      <div
        :class="{ 'hondy-comb-status': true, 'outline-status': !device.online }"
      >
        <i class="el-icon-check" v-if="device.online"></i>
        <i class="el-icon-close" v-else></i>
      </div>
      <img
        src="../../../assets/imgs/fengxiang.jpg"
        :class="{ 'device-img': true, outline: !device.online }"
      />
      <el-form label-width="90px" label-position="left">
        <el-form-item label="编号：">
          {{ device.id }}
        </el-form-item>
        <el-form-item label="脾数：">
          {{ device.frameNum }}
        </el-form-item>
        <el-form-item label="蜂王状态：">
          {{ statusLabel }}
        </el-form-item>
        <el-form-item label="安装地址：">
          {{ device.address }}
        </el-form-item>
      </el-form>
    </div>
    <div class="hondy-comb-footer">
      <el-button
        icon="el-icon-fork-spoon"
        type="primary"
        size="mini"
        @click="handleFeed"
        :disabled="!device.online"
        >喂食</el-button
      >
      <el-button
        icon="el-icon-water-cup"
        type="success"
        size="mini"
        @click="handleWater"
        :disabled="!device.online"
        >浇水</el-button
      >
      <el-button
        icon="el-icon-hot-water"
        type="danger"
        size="mini"
        @click="handleHeat"
        :disabled="!device.online"
        >加热</el-button
      >
      <el-button
        icon="el-icon-setting"
        type="warning"
        size="mini"
        @click="handleSetting"
        >设置</el-button
      >
    </div>

    <setting-modal
      :visible.sync="modalVisible"
      :device="device"
    ></setting-modal>
  </el-card>
</template>

<script>
import SettingModal from "../Setting/Index.vue";
export default {
  data() {
    return {
      statusList: ["", "种王", "生产王", "王台", "交尾群", "失王群", "病王群"],
      modalVisible: false
    };
  },
  methods: {
    async handleFeed() {
      let res = await this.$API.feed({
        serialnum: this.device.serialnum,
        mode: "on",
        delay: 1
      });
      if (res.code === 0) {
        this.$message.success("喂食成功！");
      }
    },
    async handleWater() {
      let res = await this.$API.water({
        serialnum: this.device.serialnum,
        mode: "on",
        delay: 1
      });
      if (res.code === 0) {
        this.$message.success("浇水成功！");
      }
    },
    async handleHeat() {
      let res = await this.$API.heat({
        serialnum: this.device.serialnum,
        mode: "on",
        delay: 1
      });
      if (res.code === 0) {
        this.$message.success("加热成功！");
      }
    },
    handleSetting() {
      this.modalVisible = true;
    },
    handleDetail() {
      this.$router.push({
        path: "/detail",
        query: this.device
      });
    }
  },
  computed: {
    statusLabel() {
      return this.statusList[this.device.queenBeeStatus];
    }
  },
  props: {
    device: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  components: {
    SettingModal
  }
};
</script>

<style lang="scss" scoped>
.honey-comb {
  .hondy-comb-body {
    display: flex;
    position: relative;
    padding: 15px 15px 10px;
    cursor: pointer;
    .hondy-comb-status {
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      border-radius: 30px;
      position: absolute;
      top: -10px;
      right: -10px;
      z-index: 1;
      background: #409eff;
      font-size: 20px;
      color: white;
      box-shadow: 0 0 5px gray;
    }
    .outline-status {
      background: gray;
    }

    .device-img {
      width: 120px;
      height: 120px;
      border-radius: 5px;
      overflow: hidden;
      margin-right: 15px;
    }
    .outline {
      filter: grayscale(100%);
    }
    .el-form-item {
      margin-bottom: 0px;
    }
    /deep/.el-form-item__label {
      font-weight: 700;
    }
    /deep/.el-form-item__label,
    /deep/.el-form-item__content {
      line-height: 30px;
    }
  }
  .hondy-comb-footer {
    padding: 10px 15px;
    border-top: 1px solid #eee;
    text-align: right;
  }
}
</style>
