<template>
  <div style="padding: 50px 0 60px 0">
    <div class="settingNavbar fixedTop">
      <p>个人信息</p>
      <div>
        <nut-icon name="setting" color="#fff"></nut-icon>
      </div>
    </div>
    <div v-show="tabValue == 0">个人信息</div>
    <tabbar :active="2"></tabbar>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import Tabbar from "../components/Tabbar.vue";
export default {
  setup() {
    const tabValue = ref(0);
    const methods = {
      setting() {
        alert("设置");
      },
      changeTab(tab) {
        tabValue.value = tab.paneKey;
      },
    };
    return {
      tabValue,
      ...methods,
    };
  },
  components: {
    Tabbar,
  },
};
</script>

<style scoped lang="scss">
.settingNavbar {
  background: linear-gradient(90deg, #4f5d50 0%, #687b69);
  height: 50px;
  line-height: 50px;
  position: relative;
  p {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
  }
  div {
    position: absolute;
    right: 16px;
    top: 5px;
  }
}
.fixedTop {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9;
}
</style>