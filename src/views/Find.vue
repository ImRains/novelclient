<template>
  <div style="padding: 50px 0 60px 0">
    <nut-searchbar
      class="fixedTop"
      v-model="searchValue"
      @clear="clearSearch"
      @search="searchNovels"
      background="linear-gradient(90deg, #4F5D50 0%, #687B69)"
      input-background="#fff"
      placeholder="支持搜索书名、作者哦 ~"
    >
      <template v-slot:rightout>
        <nut-icon name="search" color="#fff" @click="searchNovels"></nut-icon>
      </template>
    </nut-searchbar>
    <search-list
      :novelList="searchList"
      v-show="searchList.length > 0"
    ></search-list>
    <div class="novelCell" v-show="searchList.length == 0">
      <p>热门排行：</p>
      <hot-list :novelList="hotNovel"></hot-list>
    </div>
    <tabbar :active="1"></tabbar>
  </div>
</template>

<script>
import { toRefs, reactive, getCurrentInstance, onMounted } from "vue";
import Tabbar from "../components/Tabbar.vue";
import SearchList from "../components/SearchList.vue";
import HotList from "../components/HotList.vue";
import { getSearchRed } from "../utils/novel";
import { Toast } from "@nutui/nutui";
export default {
  setup() {
    const { proxy } = getCurrentInstance();
    const state = reactive({
      searchValue: "",
      searchList: [],
      hotNovel: [],
    });
    const methods = {
      searchNovels() {
        Toast.loading("正在搜索书籍信息, 如果加载失败请尝试重新搜索", {
          duration: 0,
        });
        proxy.$novelrequest
          .get("/api/novels/search", {
            title: state.searchValue,
            source: "xbiqu",
          })
          .then((res) => {
            if (res.status == 200 && res.data.errno == 0) {
              let result = res.data.data;
              result.map((item) => {
                item.novelSearchName = getSearchRed(
                  state.searchValue,
                  item.novelName
                );
              });
              state.searchList = result;
              Toast.hide();
            }
          });
      },
      // 获取热门小说排行
      getHotNovels() {
        proxy.$novelrequest
          .get("/api/novels/getHotNovel", {
            limit: 10,
          })
          .then((res) => {
            if (res.status == 200 && res.data.errno == 0) {
              state.hotNovel = res.data.data;
              Toast.hide();
            }
          });
      },
      clearSearch() {
        state.searchList = [];
      },
    };

    onMounted(() => {
      Toast.loading("正在加载热门小说列表...", {
        duration: 0,
      });
      methods.getHotNovels();
    });

    return {
      ...toRefs(state),
      ...methods,
    };
  },
  components: {
    Tabbar,
    SearchList,
    HotList,
  },
};
</script>

<style scoped lang="scss">
.fixedTop {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9;
}
.novelCell {
  margin: 12px 10px;
  background: #fff;
  padding: 14px 20px;
  font-size: 14px;
  line-height: 22px;
  color: #555;
  border-radius: 3px;
  box-shadow: 1px 2px 7px 0px #edeef1;
  p {
    font-size: 18px;
    font-weight: bold;
  }
}
</style>