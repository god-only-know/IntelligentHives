<template>
  <div class="user-panel">
    <div class="left">
      <div class="blue">
        <img src="../../assets/imgs/avatar.png" class="avatar" />
      </div>
      <div class="user-navigator">
        <div class="user-infor">
          <div>姓名：林佳男</div>
          <div>手机：13860147156</div>
          <div>喜欢：唱、跳、B-box、🏀</div>
        </div>
        <div
          @click="handleClick(0)"
          :class="{ active: activeIndex === 0, 'navigate-item': true }"
        >
          个人信息
        </div>
        <div
          @click="handleClick(1)"
          :class="{ active: activeIndex === 1, 'navigate-item': true }"
        >
          系统信息
        </div>
        <div
          @click="handleClick(2)"
          :class="{ active: activeIndex === 2, 'navigate-item': true }"
        >
          注销
        </div>
      </div>
    </div>
    <div class="right">
      <el-card :body-style="{ padding: '0px' }">
        <div class="header">
          <div @click="handleClick(0)" :class="{ active: activeIndex === 0 }">
            个人信息
          </div>
          <div @click="handleClick(1)" :class="{ active: activeIndex === 1 }">
            系统信息
          </div>
        </div>

        <div class="body">
          <person v-if="activeIndex === 0"></person>
          <notice v-if="activeIndex === 1"></notice>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import Person from "./components/Person/Index.vue";
import Notice from "./components/Notice/Index.vue";
export default {
  data() {
    return {
      activeIndex: 0
    };
  },
  methods: {
    handleClick(index) {
      this.activeIndex = index;
    }
  },
  components: {
    Person,
    Notice
  }
};
</script>

<style lang="scss" scoped>
$avatar-radius: 100px;
.user-panel {
  overflow: hidden;
  padding: 60px 120px;
  box-sizing: border-box;
  .left,
  .right {
    background: white;
    transition: all 0.5s;
    border-radius: 10px;
    overflow: hidden;
  }
  .left {
    width: 25%;
    text-align: center;
    float: left;
    .blue {
      height: 150px;
      background: rgb(0, 195, 221);
      position: relative;
      .avatar {
        width: $avatar-radius;
        height: $avatar-radius;
        border-radius: $avatar-radius;
        border: 5px solid white;
        position: relative;
        top: 150px - $avatar-radius/2;
        box-shadow: 0 0 5px gray;
      }
    }
    .user-navigator {
      padding: $avatar-radius/2 + 20px 20px 30px;
      .user-infor {
        margin-bottom: 10px;
        div {
          line-height: 30px;
          color: rgb(0, 195, 221);
        }
      }
      .navigate-item {
        line-height: 60px;
        transition: all 0.2s;
        cursor: pointer;
        letter-spacing: 2px;
      }
      .active {
        background: rgb(0, 195, 221);
        color: white;
      }
      .navigate-item:hover {
        background: rgb(115, 239, 255);
        color: white;
      }
    }
  }
  .right {
    box-sizing: border-box;
    margin-left: 20px;
    float: left;
    width: calc(75% - 20px);
    .header {
      display: flex;
      > div {
        width: 50%;
        text-align: center;
        cursor: pointer;
        line-height: 50px;
        border-bottom: 5px solid white;
      }
      > div.active {
        border-bottom: 5px solid rgb(0, 195, 221);
      }
    }
    .body {
      padding: 20px;
    }
  }
  .left:hover,
  .right:hover {
    box-shadow: 0 0 10px gray;
  }
}
</style>
