<template>
  <div style="padding: 50px 0 60px 0">
    <div class="settingNavbar fixedTop">
      <p>个人信息</p>
      <div>
        <nut-icon name="setting" color="#fff" @click="setting"></nut-icon>
      </div>
    </div>
    <div v-show="tabValue == 0">
      <div class="userinfo-container">
        <div class="userinfo-avatar">
          <img :src="info.picture" alt="" />
        </div>
        <div class="userinfo-msg">
          <p>{{ info.nickName }}</p>
        </div>
      </div>
      <nut-cell-group style="margin:10px">
        <nut-cell title="消息通知" @click="noFound"></nut-cell>
        <nut-cell title="我的书架" to="/addfollow"></nut-cell>
        <nut-cell title="我的好友" @click="noFound"></nut-cell>
        <nut-cell title="修改资料" to="/setting"></nut-cell>
        <nut-cell title="退出登录" to="/logout"></nut-cell>
      </nut-cell-group>
    </div>
    <tabbar :active="2"></tabbar>
  </div>
</template>

<script>
import { ref, toRefs, reactive, getCurrentInstance, onMounted, watch } from "vue";
import { useStore } from 'vuex'
import Tabbar from "../components/Tabbar.vue";
import { Toast } from "@nutui/nutui";
export default {
  setup() {
    const tabValue = ref(0);
    const { proxy } = getCurrentInstance();
    const store = useStore()
    const user = reactive({
      info: {
        picture: "/image/loading.gif",
        nickName: "用户名",
      },
    });

    onMounted(() => {
      const info = proxy.$store.state.user.userInfo;
      if (info) {
        user.info = info;
      }
    });

    const methods = {
      setting() {
        //alert("设置");
        proxy.$router.push({
          path:'setting'
        })
      },
      changeTab(tab) {
        tabValue.value = tab.paneKey;
      },
      noFound(){
        Toast.warn('功能暂未开放 ~')
      }
    };
    return {
      tabValue,
      ...methods,
      ...toRefs(user),
    };
  },
  components: {
    Tabbar,
  },
};
</script>

<style scoped lang="scss">
@import "../assets/css/public.scss";
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

.userinfo-container {
  background: linear-gradient(90deg, #4f5d50 0%, #687b69);
  padding: 10px 30px 20px 30px;
  display: flex;
  .userinfo-avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid #666;
    box-shadow: 1px 2px 7px 0px #333;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .userinfo-msg {
    flex: 1;
    margin-left: 20px;
    line-height: 60px;
    font-size: 24px;
    font-weight: bold;
    color: #f1f1f1;
  }
}
</style>