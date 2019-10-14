<template>
  <el-dialog title="蜂巢设置" :visible.sync="dialogVisible" width="50%">
    <el-form
      :model="form"
      :rules="rules"
      label-width="100px"
      label-position="left"
    >
      <el-form-item label="脾数：">
        <el-input-number
          v-model="form.frameNum"
          :min="1"
          :max="1000"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="安装地址：">
        <!-- <area-select v-model="form.address" :data="pca"></area-select> -->
        <area-cascader
          v-model="address.provinces"
          :data="pcaa"
          type="text"
        ></area-cascader>
        <el-input
          size="small"
          v-model="address.detailed"
          placeholder="请填写详细地址"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="蜂王状态：">
        <el-select v-model="form.queenBeeStatus">
          <el-option
            v-for="(item, index) in statusList"
            :label="item.label"
            :value="item.value"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { pcaa } from "area-data";
import bus from "@/utils/bus";
export default {
  data() {
    return {
      form: {
        frameNum: 1,
        queenBeeStatus: 1,
        address: ""
      },
      address: {
        provinces: "",
        detailed: ""
      },
      rules: {},
      statusList: [
        { label: "种王", value: 1 },
        { label: "生产王", value: 2 },
        { label: "王台", value: 3 },
        { label: "交尾群", value: 4 },
        { label: "失王群", value: 5 },
        { label: "病王群", value: 6 }
      ],
      pcaa
    };
  },
  created() {
    this.form = {
      frameNum: this.device.frameNum || 0,
      queenBeeStatus: this.device.queenBeeStatus || 1
    };
    this.address = {
      provinces: (() => {
        if (this.device.address) {
          return this.device.address.split(" ", 2);
        } else {
          return ["", ""];
        }
      })(),
      detailed: (() => {
        if (this.device.address) {
          let arr = this.device.address.split(" ");
          return arr[arr.length - 1];
        } else {
          return "";
        }
      })()
    };
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible;
      },
      set(value) {
        this.$emit("update:visible", value);
      }
    }
  },
  methods: {
    async handleSubmit() {
      let res = await this.$API.updateDevice(
        (() => {
          let form = Object.assign(this.form);
          form.address = (() => {
            if (this.address.provinces instanceof Array) {
              return (
                this.address.provinces.join(" ") + " " + this.address.detailed
              );
            } else {
              return this.address.provinces + " " + this.address.detailed;
            }
          })();
          form.id = this.device.id;
          form.serialnum = this.device.serialnum;
          return form;
        })()
      );
      if (res.code === 0) {
        bus.$emit("refresh");
        this.$message.success("修改成功");
        this.dialogVisible = false;
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    device: {
      type: Object,
      default: () => ({})
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
/deep/.area-select .area-selected-trigger {
  line-height: 16px;
}
/deep/ .area-cascader-wrap,
/deep/ .el-input--suffix {
  float: left;
  width: 200px;
  line-height: normal;
  display: flex;
  /deep/ .el-input__inner,
  /deep/ .area-select span {
    height: 40px;
    line-height: 25px;
  }
  /deep/ .area-select {
    height: 38px;
  }
}
</style>
