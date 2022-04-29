<template>
  <div style="padding: 50px 0 60px 0">
    <div class="shopNavbar fixedTop">
      <p>我的书架</p>
      <div>
        <nut-icon name="search" color="#fff"></nut-icon>
      </div>
    </div>
    <div class="novelCell">
      <p>书架列表</p>
      <novel-list :novelList="list"></novel-list>
    </div>
    <tabbar :active="0"></tabbar>
  </div>
</template>

<script>
import { ref, reactive, onMounted, getCurrentInstance, toRefs } from "vue";
import Tabbar from "../components/Tabbar.vue";
import NovelList from "../components/novelList.vue"
export default {
  setup() {
    const { proxy } = getCurrentInstance()

    const novel = reactive({
      list:[]
    })

    const methods = {
      changeTab(tab) {
        tabValue.value = tab.paneKey;
      },
      getCollectionList(){
        proxy.$novelrequest.get('/api/user/getNovelFollowList').then(res=>{
          if(res.status == 200 && res.data.errno == 0){
            novel.list = res.data.data.novelList
          }
          console.log(novel.list)
        })
      }
    };

    onMounted(() => {
      // 获取用户收藏列表
      methods.getCollectionList()
    })

    return {
      ...methods,
      ...toRefs(novel)
    };
  },
  components: {
    Tabbar,
    NovelList
  },
};
</script>

<style scoped lang="scss">
@import '../assets/css/public.scss';
.novelCell{
  p {
    font-size: 18px;
    font-weight: bold;
  }
}
</style>