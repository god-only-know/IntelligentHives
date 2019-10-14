<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-edit"
      style="float:right"
      @click="handleOpenDialog"
      size="small"
      >编辑</el-button
    >
    <div class="caption">蜂箱情况</div>
    <el-row class="infor-list" :gutter="20">
      <el-col :span="8">
        <div class="block-1">
          <div class="name">蜂箱总数</div>
          <div class="number">{{ allNumber }}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="block-2">
          <div class="name">健康蜂箱</div>
          <div class="number">{{ healthyNumber }}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="block-3">
          <div class="name">病危蜂箱</div>
          <div class="number">{{ dyingNumber }}</div>
        </div>
      </el-col>
    </el-row>
    <div class="caption">蜂箱位置</div>
    <b-map></b-map>
    <div class="caption">用户信息</div>
    <el-row class="user-infor">
      <el-col :span="12"> 电子邮箱：{{ email }} </el-col>
      <el-col :span="12"> 电话：{{ phone }} </el-col>
      <el-col :span="12"> 蜂巢所在地：{{ address }} </el-col>
      <el-col :span="12">
        产蜜情况：{{ statusList.find(item => item.value === status).label }}
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible" title="编辑信息" width="50%">
      <el-form
        :model="form"
        :rules="rules"
        label-width="120px"
        label-position="left"
        ref="form"
      >
        <el-form-item label="蜂巢总数：" prop="allNumber">
          <el-input-number v-model="form.allNumber" :mix="0"></el-input-number>
        </el-form-item>
        <el-form-item label="健康蜂巢：" prop="healthyNumber">
          <el-input-number
            v-model="form.healthyNumber"
            :mix="0"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="病危蜂巢：" prop="dyingNumber">
          <el-input-number
            v-model="form.dyingNumber"
            :mix="0"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="电子邮箱：" prop="email">
          <el-input
            v-model="form.email"
            placeholder="请输入您的电子邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机：" prop="phone">
          <el-input
            v-model="form.phone"
            placeholder="请输入您的手机"
          ></el-input>
        </el-form-item>
        <el-form-item label="蜂巢所在地：" prop="address">
          <el-input
            v-model="form.address"
            placeholder="请输入蜂巢所在地"
          ></el-input>
        </el-form-item>
        <el-form-item label="产蜜情况：" prop="address">
          <el-select v-model="form.status">
            <el-option
              v-for="(item, index) in statusList"
              :label="item.label"
              :value="item.value"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" icon="el-icon-edit" @click="handleEdit"
          >编辑</el-button
        >
        <el-button icon="el-icon-close" @click="dialogVisible = false"
          >取消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BMap from "@/components/BMap/Index.vue";
export default {
  data() {
    return {
      form: {
        allNumber: 18,
        healthyNumber: 13,
        dyingNumber: 5,
        email: "4968450000@qq.com",
        phone: "1566666666",
        address: "北京",
        status: 2
      },
      statusList: [
        { label: "较差", value: 0 },
        { label: "及格", value: 1 },
        { label: "良好", value: 2 },
        { label: "优秀", value: 3 }
      ],
      rules: {},
      allNumber: 18,
      healthyNumber: 13,
      dyingNumber: 5,
      email: "4968450000@qq.com",
      phone: "1566666666",
      address: "北京",
      status: 2,

      dialogVisible: false
    };
  },
  methods: {
    handleOpenDialog() {
      this.dialogVisible = true;
    },
    handleEdit() {
      setTimeout(() => {
        Object.entries(this.form).forEach(([key, value]) => {
          this[key] = value;
        });
        this.dialogVisible = false;
        this.$message.success("修改成功");
      }, 500);
    }
  },
  components: {
    BMap
  }
};
</script>

<style lang="scss" scoped>
.caption {
  line-height: 40px;
  margin-top: 10px;
  font-size: 20px;
  font-weight: 700;
}
.infor-list {
  text-align: center;
  .el-col {
    box-sizing: border-box;
    padding: 0px 20px;
  }
  .block-1,
  .block-2,
  .block-3 {
    overflow: hidden;
    cursor: pointer;
    transition: all 0.5s;
    border-radius: 10px;
    color: white;
    .name {
      overflow: hidden;
      font-size: 20px;
      line-height: 50px;
      margin-top: 10px;
    }
    .number {
      font-size: 16px;
      line-height: 20px;
      margin-bottom: 16px;
    }
  }
  .block-1:hover,
  .block-2:hover,
  .block-3:hover {
    box-shadow: 0 0 10px gray;
  }
  .block-1 {
    background: rgb(50, 0, 231);
  }
  .block-2 {
    background: rgb(0, 173, 58);
  }
  .block-3 {
    background: rgb(158, 0, 0);
  }
}
.amap-wrapper {
  width: 500px;
  height: 500px;
}
.user-infor {
  line-height: 40px;
  font-size: 16px;
}
</style>
