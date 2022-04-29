<template>
  <div style="padding: 50px 0 60px 0">
    <nut-navbar
      :left-show="true"
      @on-click-back="goBack"
      title="修改信息"
      class="novelInfoNavbar fixedTop"
    >
    </nut-navbar>
    <div class="novelCell setting">
      <div class="setting-avator">
        <!-- <img :src="info.picture" alt=""> -->
        <nut-uploader url="http://localhost:5566/api/utils/upload" v-model:file-list="defaultFileList" @success="onSuccess" @delete="onDelete" @falure="onFailure" :headers="uploadHeader"></nut-uploader>
      </div>
      <nut-input :placeholder="info.nickName" v-model="newInfo.nickName" label="昵称" />
      <nut-input :placeholder="info.city" v-model="newInfo.city" label="城市" />
      <nut-button block type="primary" style="margin-top:16px" @click="changeUserInfo">确认修改</nut-button>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, onMounted, getCurrentInstance } from 'vue';
import { useRouter, } from 'vue-router'
import { useStore } from 'vuex'
export default {
  setup() {
      const router = useRouter()
      const store = useStore()
      const { proxy } = getCurrentInstance()
      const uploadHeader = {
        Authorization : localStorage.getItem('Authorization_token')
      }
      const user = reactive({
        info:{
          nickName:'',
          picture:'',
          city:''
        },
        newInfo:{
          nickName:'',
          picture:'',
          city:''
        }
      })
      const defaultFileList = ref([{
        name: '文件1.png',
        url: store.state.user.userInfo.picture,
        status: 'success',
        message: '上传成功',
        type: 'image'
      }])
      onMounted(() => {
        // 获取用户信息
        let info = store.state.user.userInfo
        user.info.nickName = info.nickName
        user.info.city = info.city
        user.info.picture = info.picture
      })

      const methods = {
          goBack(){
              router.go(-1);
          },
          onSuccess(responseText){
            let res = JSON.parse(responseText.responseText)
            if(res.errno == 0){
              user.newInfo.picture = res.data.url
            }
          },
          onFailure(responseText,option,fileItem){
            console.log('fail',responseText,option,fileItem)
          },
          changeUserInfo(){
            // 修改用户信息
            let { nickName,picture,city } = user.newInfo
            let option = {}
            if(nickName)option.nickName = nickName
            if(picture)option.picture = picture
            if(city)option.city = city
            console.log(option)
            proxy.$novelrequest.patch('/api/user/changeInfo',option).then(res=>{
              console.log(res)
              // vuex 存储返回用户信息
              if(res.status == 200 && res.data.errno ==0){
                store.commit('user/setUserInfo',res.data.data.userInfo)
              }
            },rej=>{})
          },
          onDelete(files,fileList,index){
            user.newInfo.picture = ''
          }
      }
      return {
          ...methods,
          defaultFileList,
          uploadHeader,
          ...toRefs(user)
      }
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/css/public.scss';
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
.setting{
  .setting-avator{
    width: 100px;
    height: 100px;
    margin:auto;
    img{
      width:100%;
      height:100%
    }
  }
}

</style>