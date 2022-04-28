<template>
  <div style="padding: 50px 0 60px 0">
    <nut-navbar
      :left-show="true"
      @on-click-back="goBack"
      title="修改信息"
      class="novelInfoNavbar fixedTop"
    >
    </nut-navbar>
    <tabbar :active="0"></tabbar>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  setup() {
      const router = useRouter()
      const methods = {
          goBack(){
              router.go(-1);
          }
      }
      return {
          ...methods
      }
  },
};
</script>

<style lang="scss" scoped>
.novelInfoNavbar {
  background: linear-gradient(90deg, #4f5d50 0%, #687b69);
  height: 50px;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 0px;
  box-shadow: none;
}
.fixedTop {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9;
}
</style>