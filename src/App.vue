<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: "App",
    components: {},
  };
</script>

<style lang="scss">
  @import "./style/common.scss";

  .router-fade-enter-active,
  .router-fade-live-active {
    transition: opacity 0.3s;
  }

  .router-fade-enter,
  .router-fade-leave-active {
    opacity: 0;
  }
</style>
