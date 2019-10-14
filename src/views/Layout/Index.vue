<template>
  <div class="layout">
    <o-header></o-header>
    <div class="layout-body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import oHeader from "./Header/Index.vue";
export default {
  components: {
    oHeader
  }
};
</script>

<style lang="scss" scoped>
.layout {
  height: 100vh;
  width: 100vw;
  .layout-body {
    height: calc(100vh - 60px);
    > div {
      height: 100%;
      width: 100%;
      overflow: auto;
      background: #eee;
    }
  }
}
</style>
