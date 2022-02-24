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
        @click="goToNovelInfo(item.novelName,item.novelsourceUrl)"
      >
        <div class="novelcontainer">
          <nut-avatar size="60" icon="/image/novelNomal.jpeg" />
          <div class="right-content">
            <div class="title" v-html="item.novelSearchName"></div>
            <div class="desc">
              作者：{{item.author}}
            </div>
            <div class="desc">
              最新章节：{{item.newChapter}}  {{item.date}}
            </div>
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
    const router = useRouter()
    const normalImage = "/image/novelNomal.jpeg";
    const methods = {
        goToNovelInfo(novelName,novelsourceUrl){
            // 跳转到小说详情页
            router.push({
                path: 'novelinfo',
                query: {
                    title:novelName,
                    source:'xbiqu',
                    sourceUrl:encodeURIComponent(novelsourceUrl)
                },
            })
        }
    }
    return {
      normalImage,
      ...methods
    };
  },
};
</script>

<style lang="scss" scoped>
.novelcontainer {
  display: flex;
  padding: 12px;
  .right-content {
    margin-left: 25px;
    font-family: PingFangSC;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      font-size: 16px;
      color: rgba(51, 51, 51, 1);
      font-weight: bold;
    }
    .desc {
      margin-top: 10px;
      font-size: 13px;
      color: rgba(154, 155, 157, 1);
    }
  }
}
</style>