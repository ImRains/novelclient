<template>
  <div style="padding: 50px 0 60px 0">
    <nut-navbar
      :left-show="true"
      @on-click-send="showChapter"
      @on-click-back="goBack"
      :title="noverInfo.title"
      icon="horizontal-n"
      class="novelInfoNavbar fixedTop"
    >
    </nut-navbar>
    <nut-popup
      position="right"
      v-model:visible="isShowChapter"
      :style="{ width, height, background }"
      :destroy-on-close="popupConf.isDestory"
    >
      <div class="topNovelInfo">
        <div class="novelInfoImg">
          <img :src="noverInfo.cover" alt="" />
        </div>
        <div class="novelInfoMsg">
          <div class="noverTitle">{{ noverInfo.title }}</div>
          <p>{{ noverInfo.author }}</p>
        </div>
      </div>
      <ul class="chapterList" @click="goTargetChapter($event)">
        <li
          v-for="(item, index) in chapterData.all.rows"
          :key="index"
          :data-chapterindex="item.chapterindex"
        >
          {{ item.chaptername }}
        </li>
      </ul>
    </nut-popup>
    <div class="chapterContent">
      <p class="chapterContentTitle">
        {{ chapterMsg.msg.chaptername }}
      </p>
      <p
        class="chapterContentInfo"
        style="white-space: pre-wrap"
        v-text="chapterMsg.msg.chaptercontent"
      ></p>
    </div>
    <div class="chapterContentTabbar">
      <div class="chapterContentTabbarButton" @click="goPreChapter">
        <nut-button type="primary" block size="normal">上一章</nut-button>
      </div>
      <div class="chapterContentTabbarButton" @click="goNextChapter">
        <nut-button type="primary" block size="normal">下一章</nut-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ref,
  reactive,
  onMounted,
  toRefs,
  getCurrentInstance,
  computed,
} from "vue";
import { Toast } from "@nutui/nutui";
import { useRouter } from "vue-router";
export default {
  setup() {
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    onMounted(() => {
      methods.showLoad();
      methods.getUrlParams();
      methods.getNoverInfo();
      methods.getChapterInfo(chapternow.bookid, chapternow.chapterindex);
    });
    const chapternow = reactive({
      bookid: null,
      chapterindex: null,
    });
    let noverInfo = reactive({
      title: "",
    });
    const chapterData = reactive({
      all: [],
    });
    const chapterMsg = reactive({
      msg: {},
    });
    const state = reactive({
      isShowChapter: false,
      width: "70%",
      height: "100%",
      background: "#e0e5df",
    });
    const popupConf = reactive({
      isDestory: false,
    });
    const methods = {
      showLoad() {
        Toast.loading("正在加载章节信息, 请稍后", {
          duration: 0,
        });
      },
      // 获取参数
      getUrlParams() {
        let { bookid, chapterindex } = router.currentRoute.value.params;
        chapternow.bookid = bookid;
        chapternow.chapterindex = Number(chapterindex);
      },
      // 获取小说章节信息
      getNoverInfo() {
        proxy.$novelrequest
          .get("/api/novels/getNovelInfoById", {
            bookid: chapternow.bookid,
          })
          .then((res) => {
            if (res.status == 200 && res.data.errno == 0) {
              noverInfo = Object.assign(noverInfo, res.data.data.info);
              let chapter = res.data.data.chapters;
              chapterData.all = chapter;
              Toast.hide();
            }
          });
      },
      // 获取小说章节信息
      getChapterInfo(novelId, chapterindex) {
        proxy.$novelrequest
          .get("/api/novels/chaptercontent", {
            novelId,
            chapterindex,
          })
          .then((res) => {
            if (res.status == 200 && res.data.errno == 0) {
              chapterMsg.msg = res.data.data;
              Toast.hide();
            }
          });
      },
      // 下一章
      goNextChapter() {
        if (chapternow.chapterindex + 1 >= chapterData.all.count) {
          this.showErrorToast("已经到达最新章节了 ~ ");
        } else {
          Toast.loading("正在加载章节信息, 请稍后", {
            duration: 0,
          });
          chapternow.chapterindex++;
          this.getChapterInfo(chapternow.bookid, chapternow.chapterindex);
          document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
      },
      // 前一章
      goPreChapter() {
        if (chapternow.chapterindex == 0) {
          this.showErrorToast("已经到达最前面了 ~ ");
        } else {
          Toast.loading("正在加载章节信息, 请稍后", {
            duration: 0,
          });
          chapternow.chapterindex--;
          this.getChapterInfo(chapternow.bookid, chapternow.chapterindex);
          document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
      },
      goTargetChapter(event) {
        Toast.loading("正在加载章节信息, 请稍后", {
          duration: 0,
        });
        let chapterindex = event.target.getAttribute("data-chapterindex");
        chapternow.chapterindex = Number(chapterindex);
        this.getChapterInfo(chapternow.bookid, chapternow.chapterindex);
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      },
      showErrorToast(msg) {
        Toast.fail(msg);
      },
      goBack() {
        router.go(-1);
      },
      showChapter() {
        state.isShowChapter = !state.isShowChapter;
      },
    };
    return {
      chapterData,
      noverInfo,
      chapterMsg,
      popupConf,
      chapternow,
      ...toRefs(state),
      ...methods,
    };
  },
};
</script>

<style scoped lang="scss">
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
.topNovelInfo {
  display: flex;
  padding: 30px 20px;
  position: fixed;
  width: 100%;
  background-color: #e0e5df;
  .novelInfoImg {
    height: 100px;
    width: 75px;
    img {
      height: 100%;
      border: 1px solid white;
      box-shadow: 1px 2px 7px 0px #333;
    }
  }
  .novelInfoMsg {
    display: flex;
    flex-direction: column;
    height: 100px;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 10px 0 10px 20px;
    .noverTitle {
      color: #4f5d50;
      font-size: 16px;
      font-weight: bold;
    }
    p {
      color: #999;
    }
  }
}
.chapterList {
  padding: 0 20px 20px 20px;
  margin-top: 160px;
  li {
    line-height: 30px;
    color: #4f5d50;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 30px;
    font-size: 16px;
  }
}
.chapterContent {
  padding: 16px;
  background: #e1e5e4;
  .chapterContentTitle {
    font-size: 26px;
    font-weight: bold;
    text-align: center;
    line-height: 30px;
    padding: 10px 10px 0 10px;
  }
  .chapterContentInfo {
    font-size: 20px;
    line-height: 36px;
  }
}
.chapterContentTabbar {
  height: 60px;
  background: #e1e5e4;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 25px;
  box-sizing: border-box;
  .chapterContentTabbarButton {
    width: 140px;
    padding: 11px 0;
  }
}
</style>