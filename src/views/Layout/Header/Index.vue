<template>
  <div class="header">
    <span class="title" @click="$router.push('/home')">蜂箱检测控制系统</span>

    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
      background-color="#101010"
      text-color="rgb(35, 119, 168)"
      active-text-color="rgb(91, 195, 255)"
    >
      <el-menu-item index="home"
        ><i class="el-icon-s-home"></i>主页</el-menu-item
      >
      <el-menu-item index="user"><i class="el-icon-user"></i>我的</el-menu-item>
      <el-menu-item index="logout"
        ><i class="el-icon-circle-close"></i>注销</el-menu-item
      >
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: ""
    };
  },
  methods: {
    handleSelect(command) {
      if (command === "home") {
        this.$router.push("/home");
      } else if (command === "logout") {
        this.$store.commit("CLEAR_TOKEN");
        localStorage.removeItem("token");
        this.$router.replace("/login");
      } else if (command === "user") {
        this.$router.push("/user");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  height: 60px;
  background: #101010;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  .title {
    line-height: 60px;
    margin-left: 20px;
    color: rgb(35, 119, 168);
    font-weight: 600;
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 2px;
  }
  .el-menu {
    float: right;
    margin-right: 30px;
    .el-menu-item i {
      color: rgb(35, 119, 168);
    }
  }
}
</style>
