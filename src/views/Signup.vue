<template>
    <nut-navbar
      :left-show="true"
      @on-click-back="goBack"
      title="注册"
      class="novelInfoNavbar fixedTop"
    >
    </nut-navbar>
    <div class="loginContainer" :style="{height:bodyHeight + 'px'}">
        <div class="inputContainer">
            <div class="inputItem">
                <!-- <p>账号 :</p> -->
                <input type="text" placeholder="Account" v-model="username">
            </div>
            <div class="inputItem">
                <!-- <p>密码 :</p> -->
                <input type="password" placeholder="Password" v-model="password">
            </div>
            <div class="inputItem">
                <!-- <p>密码 :</p> -->
                <input type="password" placeholder="Input your Password again" v-model="cpassword">
            </div>
            <div class="toLogin">
                <p class="errorInfo">{{errorinfo}}</p>
                <p>
                    已有账号?去
                    <span @click="goToLogin">登录</span>
                </p>
            </div>
            <div class="inputButton" @click="signup">
                注&nbsp;&nbsp;&nbsp;&nbsp;册
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, ref, toRefs, getCurrentInstance, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from "@nutui/nutui";
export default {
    setup() {
        const router = useRouter()
        const { proxy } = getCurrentInstance();
        const bodyHeight = ref(400)
        const signup = reactive({
            username:'',
            password:'',
            cpassword:'',
            errorinfo:'',
            isSign:false
        })
        onMounted(() => {
            bodyHeight.value = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        })
        const methods = {
            goBack(){
                router.go(-1)
            },
            goToLogin(){
                let query = {}
                let _q = router.currentRoute.value.query
                if( _q && _q.backUrl){
                    query.backUrl = _q.backUrl
                }
                router.push({
                    path: `/login`,
                    query
                });
            },
            signup(){
                if(signup.username.length == 0 && signup.password.length == 0 && signup.cpassword.length == 0){
                    Toast.warn('请输入账号密码')
                }else if(signup.password !== signup.cpassword){
                    Toast.warn('两次密码不一致')
                }
                else{
                    Toast.loading("正在提交请求，请稍等", {
                        duration: 0,
                    });
                    proxy.$novelrequest
                    .post('/api/user/register',{
                        userName: signup.username,
                        password: signup.password
                    })
                    .then(res => {
                        if(res.status == 200 && res.data.errno == 0){
                            // 注册成功
                            Toast.hide();
                            Toast.success('注册成功, 即将前往登录页面 ~')
                            setTimeout(()=>{
                                router.push({
                                    path: `/login`,
                                });
                            },2000)
                        }
                    })
                }
                
            }
        }
        return {
            bodyHeight,
            ...methods,
            ...toRefs(signup)
        }
    },
}
</script>

<style lang="scss" scoped>
    .novelInfoNavbar{
        background: transparent;
        height: 50px;
        color:#fff;
        font-size: 18px;
        font-weight: bold;
        margin-bottom:0px;
        box-shadow: none;
    }
    .fixedTop{
        position: fixed;
        top: 0;
        width:100%;
        z-index: 9;
    }

    .loginContainer{
        background: url('/image/background.jpg');
        background-size: 100% auto;
        height:100px;
        position:relative;
        .inputContainer{
            position: absolute;
            max-width:300px;
            width:80%;
            //background: rgba($color: #fff, $alpha: .3);
            bottom:30%;
            left:0;
            right:0;
            margin: auto;
            z-index:9;
            padding:20px;
            border-radius: 5px;
            //box-shadow: 1px 2px 7px 0px #333;
            .inputItem{
                margin-top: 16px;
                p{
                    font-size: 14px;
                    font-weight: bold;
                    color:#dcdfbc;
                    margin-bottom: 6px;
                }
                input{
                    display: block;
                    background: rgba($color: #333, $alpha: .1);
                    width:100%;
                    height:50px;
                    padding: 0 18px;
                    box-sizing: border-box;
                    color:#dcdfbc;
                    //border-radius: 5px;
                    //box-shadow: 0px 1px 3px 0px #333;
                    border-bottom: 1px solid #dcdfbc;
                    font-size: 16px;
                    line-height: 16px;
                    &:focus{
                        background: rgba($color: #999, $alpha: .1);
                        box-shadow: 1px 2px 7px 0px #333;
                        border-bottom: 2px solid #dcdfbc;
                    }
                }
                input::placeholder{
                    color: rgba($color: #999, $alpha: .6);
                }
            }
            .inputButton{
                position: absolute;
                height: 40px;
                font-size: 16px;
                color: #dcdfbc;
                font-weight: bold;
                border-radius: 4px;
                border:1px solid #dcdfbc;
                line-height: 40px;
                display: inline-block;
                width: 160px;
                text-align: center;
                margin-top: 60px;
                left: 0;
                right: 0;
                margin-left: auto;
                margin-right: auto;
            }
            .toLogin{
                font-size: 12px;
                text-align: right;
                height: 20px;
                color: rgba($color: #999, $alpha: .7);
                margin-top: 12px;
                display: flex;
                justify-content: space-between;
                .errorInfo{
                    color: rgba($color: rgb(255, 0, 0), $alpha: .7);
                }
                p{
                    font-size: 12px;
                    height: 20px;
                    line-height: 20px;
                    span{
                        color: #dcdfbc;
                    }
                }
            }
        }
    }
</style>