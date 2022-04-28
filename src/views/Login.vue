<template>
    <nut-navbar
      :left-show="true"
      title="登录"
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
            <div class="toSignup">
                没有账号?去
                <span @click="goToSignup">注册</span>
            </div>
            <div class="inputButton" @click="login">
                登&nbsp;&nbsp;&nbsp;&nbsp;录
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, ref, getCurrentInstance, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
export default {
    setup() {
        const router = useRouter()
        const bodyHeight = ref(400)
        const { proxy } = getCurrentInstance()
        const user = reactive({
            username:'',
            password:''
        })
        onMounted(() => {
            bodyHeight.value = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        })
        const methods = {
            goBack(){
                router.go(-1)
            },
            goToSignup(){
                let query = {}
                let _q = router.currentRoute.value.query
                if( _q && _q.backUrl){
                    query.backUrl = _q.backUrl
                }
                router.push({
                    path: `/signup`,
                    query
                });
            },
            login(){
                proxy.$novelrequest
                .post('/api/user/login',{
                    userName: user.username,
                    password: user.password
                }).then(res => {
                    proxy.$store.dispatch('setUserInfo',res.data.data.userInfo)
                    let url = router.currentRoute.value.query.backUrl
                                ? decodeURIComponent(router.currentRoute.value.query.backUrl)
                                : '/'
                    router.push({
                        path:url
                    })
                },rej => {

                })
            }
        }
        return {
            bodyHeight,
            ...methods,
            ...toRefs(user)
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
            .toSignup{
                font-size: 12px;
                text-align: right;
                height: 20px;
                color: rgba($color: #999, $alpha: .7);
                margin-top: 12px;
                span{
                    color: #dcdfbc;
                }
            }
        }
    }
</style>