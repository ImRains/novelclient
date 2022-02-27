<template>
  <div style="padding: 50px 0 60px 0">
    <nut-navbar
      :left-show="true"
      @on-click-send="setMore"
      @on-click-back="goBack"
      :title="noverInfo.title"
      icon="more-x"
      class="novelInfoNavbar fixedTop"
    >
    </nut-navbar>
    <div class="novelMsg">
      <div class="msgLeft">
        <div class="noverTitle">{{ noverInfo.title }}</div>
        <p>{{ noverInfo.author }}</p>
      </div>
      <div class="msgRight">
        <div>
          <img :src="noverInfo.cover" alt="" />
        </div>
      </div>
    </div>
    <div class="novelCell">
      <span class="blod big">简介：</span>
      {{ noverInfo.desc }}
    </div>
    <div class="novelCell">
      <p class="blod big">最新章节</p>
      <nut-divider :style="{ color: '#ccc', borderColor: '#ccc' }" />
      <ul class="chapterList" @click="goTargetChapter($event)">
        <li
          v-for="(item, index) in chapterData.last"
          :key="index"
          :data-chapterindex="item.chapterindex"
        >
          {{ item.chaptername }}
        </li>
      </ul>
    </div>
    <div class="novelCell">
      <div class="allChapter">
        <p class="blod big">全部章节</p>
        <nut-icon
          name="retweet"
          class="rightIcon"
          @click="reverseAllChapter"
        ></nut-icon>
      </div>
      <nut-divider :style="{ color: '#ccc', borderColor: '#ccc' }" />
      <ul class="chapterList" @click="goTargetChapter($event)">
        <li
          v-for="(item, index) in chapterData.all.rows"
          :key="index"
          :data-chapterindex="item.chapterindex"
        >
          {{ item.chaptername }}
        </li>
      </ul>
    </div>
    <div class="novelInfoBottom">
      <div class="addFollow">
        <p>
          <nut-icon name="addfollow" size="18"></nut-icon>
        </p>
        加入书架
      </div>
      <div class="novelRead">
        <div @click="toReadNovel">
          <nut-button type="primary" block> 免费阅读 </nut-button>
        </div>
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
import { useRouter } from "vue-router";
import { Toast } from "@nutui/nutui";
export default {
  setup() {
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    onMounted(() => {
      methods.showLoad();
      methods.getNoverInfo();
    });
    let noverInfo = reactive({
      title: "",
      rows: [],
    });
    const chapterData = reactive({
      last: [],
      all: [],
    });
    const methods = {
      showLoad() {
        Toast.loading("正在读取书籍信息, 如果加载失败请刷新页面", {
          duration: 0,
        });
      },
      getNoverInfo() {
        let { title, source, sourceUrl } = router.currentRoute.value.query;
        proxy.$novelrequest
          .get("/api/novels/getNovelInfo", {
            title,
            sourceUrl,
            source,
          })
          .then((res) => {
            if (res.status == 200 && res.data.errno == 0) {
              noverInfo = Object.assign(noverInfo, res.data.data.info);
              let chapter = res.data.data.chapters;
              chapterData.last = JSON.parse(JSON.stringify(chapter.rows))
                .reverse()
                .slice(0, 5);
              chapterData.all = chapter;
              Toast.hide();
            }
          });
      },
      reverseAllChapter() {
        chapterData.all.rows.reverse();
      },
      setMore() {
        alert("搜索书籍");
      },
      goBack() {
        router.go(-1);
      },
      toReadNovel() {
        router.push({
          path: `/chapter/${noverInfo.id}/0`,
        });
      },
      goTargetChapter(event) {
        let index = event.target.getAttribute("data-chapterindex");
        router.push({
          path: `/chapter/${noverInfo.id}/${index}`,
        });
      },
    };
    return {
      chapterData,
      noverInfo,
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
.novelMsg {
  height: 160px;
  padding: 20px;
  box-sizing: border-box;
  background: linear-gradient(90deg, #4f5d50 0%, #687b69);
  display: flex;
  .msgLeft {
    flex: 3;
    padding: 20px 0 20px 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .noverTitle {
      font-size: 20px;
      font-weight: bold;
      color: #fff;
    }
    p {
      font-size: 16px;
      color: #fff;
    }
  }
  .msgRight {
    flex: 2;
    div {
      float: right;
      height: 120px;
      width: 85px;
      text-align: right;
      img {
        height: 100%;
        width: 100%;
        border: 1px solid white;
        box-shadow: 1px 2px 7px 0px #333;
      }
    }
  }
}
.novelCell {
  margin: 12px 10px;
  background: #fff;
  padding: 14px 20px;
  font-size: 16px;
  line-height: 26px;
  color: #555;
  border-radius: 3px;
  box-shadow: 1px 2px 7px 0px #edeef1;
  .blod {
    font-weight: bolder;
    color: #333;
  }
  .big {
    font-size: 20px;
  }
  .chapterList {
    li {
      font-size: 16px;
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0 6px;
    }
  }
  .allChapter {
    display: flex;
    justify-content: space-between;
  }
}

.novelInfoBottom {
  position: fixed;
  bottom: -1px;
  height: 50px;
  width: 100%;
  line-height: 50px;
  background: #fff;
  display: flex;
  .addFollow {
    flex: 1;
    display: flex;
    text-align: center;
    flex-direction: column;
    line-height: normal;
    font-size: 12px;
    transform: translateY(4px);
    p {
      transform: translateY(4px);
    }
  }
  .novelRead {
    flex: 2;
    padding: 7px 0;
    div {
      width: 188px;
      float: right;
      margin-right: 20px;
    }
  }
}
</style>