<template>
  <ul class="novelList">
    <li v-for="(item, index) in novelList" :key="index">
      <nut-skeleton
        width="250px"
        height="15px"
        title
        animated
        avatar
        row="3"
        :loading="false"
        @click="goToNovelInfo(item.title, item.sourceUrl)"
      >
        <div class="novelcontainer">
          <div class="novelImg">
            <img :src="item.cover" alt="" />
          </div>
          <div class="right-content">
            <div class="title" v-html="item.title"></div>
            <div class="desc">{{ item.author }}</div>
            <div class="desc">简介：{{ item.desc }}</div>
          </div>
        </div>
      </nut-skeleton>
    </li>
  </ul>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  props: {
    novelList: Array,
  },
  setup(props) {
    const router = useRouter();
    const normalImage = "/image/novelNomal.jpeg";
    const methods = {
      goToNovelInfo(novelName, sourceUrl) {
        // 跳转到小说详情页
        router.push({
          path: "novelinfo",
          query: {
            title: novelName,
            source: "xbiqu",
            sourceUrl:encodeURIComponent(sourceUrl),
          },
        });
      },
    };
    return {
      normalImage,
      ...methods,
    };
  },
};
</script>

<style lang="scss" scoped>
.novelcontainer {
  display: flex;
  padding: 14px 8px;
  border-bottom: 1px solid #f1f1f1;
  .novelImg {
    flex: 1;
    img {
      width: 75px;
      height: 100px;
      border: 1px solid white;
      box-shadow: 1px 2px 7px 0px #333;
    }
  }
  .right-content {
    flex: 2.5;
    margin-left: 25px;
    font-family: PingFangSC;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      font-size: 18px;
      color: rgba(51, 51, 51, 1);
      font-weight: bold;
    }
    .desc {
      margin-top: 0px;
      font-size: 14px;
      color: rgba(154, 155, 157, 1);
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>