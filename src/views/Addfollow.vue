<template>
  <div style="padding: 50px 0 60px 0">
    <div class="shopNavbar fixedTop">
      <p>我的书架</p>
      <div>
        <nut-icon name="search" color="#fff"></nut-icon>
      </div>
    </div>
    <div>书架列表</div>
    <tabbar :active="0"></tabbar>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import Tabbar from "../components/Tabbar.vue";
export default {
  setup() {
    const methods = {
      searchBook() {
        alert("搜索书籍");
      },
      changeTab(tab) {
        tabValue.value = tab.paneKey;
      },
    };
    return {
      ...methods,
    };
  },
  components: {
    Tabbar,
  },
};
</script>

<style scoped lang="scss">
@import '../assets/css/public.scss';
</style>