<template>
    <div class="shopNavbar fixedTop">
      <p>我的书架</p>
      <div>
        <nut-icon name="search" color="#fff"></nut-icon>
      </div>
    </div>
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

<style scoped lang="scss">
    .shopNavbar{
        background: linear-gradient(90deg, #4F5D50 0%, #687B69);
        height: 50px;
        line-height: 50px;
        position: relative;
        p{
          text-align: center;
          font-size: 18px;
          font-weight: bold;
          color: #fff;
        }
        div{
          position: absolute;
          right: 16px;
          top:5px;
        }
    }

    .fixedTop{
        position: fixed;
        top: 0;
        width:100%;
        z-index: 9;
    }
</style>