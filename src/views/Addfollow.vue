<template>
    <nut-navbar
      :left-show="false"
      @on-click-send="searchBook"
      icon="search"
      class="shopNavbar fixedTop"
    >
      <template #content>
        <nut-tabs v-model="tabValue" @click="changeTab" background="transparent">
          <nut-tabpane title="我的书架"></nut-tabpane>
        </nut-tabs>
      </template>
    </nut-navbar>
    <div v-show="tabValue == 0">
      书架列表
    </div>
    <tabbar :active="0"></tabbar>
</template>

<script>
import { ref, reactive } from "vue";
import Tabbar from '../components/Tabbar.vue'
export default {
    setup() {
    const tabValue = ref(0);
    const methods = {
      searchBook() {
        alert("搜索书籍");
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
    components:{
        Tabbar
    }
}
</script>

<style scoped>
    .shopNavbar{
        background: linear-gradient(90deg, #4F5D50 0%, #687B69);
        height: 50px;
    }

    .fixedTop{
        position: fixed;
        top: 0;
        width:100%;
        z-index: 9;
    }
</style>