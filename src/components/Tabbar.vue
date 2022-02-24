<template>
    <nut-tabbar :bottom="true" :safeAreaInsetBottom="true"  v-model:visible="active" active-color="#4F5D50" unactive-color="#999" class="globalTabbar">
        <nut-tabbar-item tab-title="书架" href="/addfollow" icon="addfollow"></nut-tabbar-item>
        <!-- <nut-tabbar-item tab-title="书城" href="/" icon="shop3"></nut-tabbar-item> -->
        <nut-tabbar-item tab-title="发现" href="/" icon="find"></nut-tabbar-item>
        <nut-tabbar-item tab-title="我的" href="/my" icon="my"></nut-tabbar-item>
    </nut-tabbar>
</template>

<script>
  export default{
    props:{
      active:Number
    },
    setup() {
      function tabSwitch(item, index) {
        console.log(item, index);
      }
      return {
        tabSwitch,
      };
    },
  }
  
</script>

<style lang="scss" scoped>
  .globalTabbar{
    height:60px;
  }
</style>