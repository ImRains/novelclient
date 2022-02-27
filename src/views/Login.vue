<template>
    <nut-navbar
      :left-show="true"
      @on-click-send="showChapter"
      @on-click-back="goBack"
      title="登陆"
      icon="horizontal-n"
      class="novelInfoNavbar fixedTop"
    >
    </nut-navbar>
    <div class="loginContainer" :style="{height:bodyHeight + 'px'}">
        <div class="inputContainer">
            <div class="inputItem">
                <p>账号 :</p>
                <input type="text">
            </div>
            <div class="inputItem">
                <p>密码 :</p>
                <input type="password">
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
    setup() {
        const router = useRouter()
        const bodyHeight = ref(400)
        onMounted(() => {
            bodyHeight.value = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        })
        const methods = {
            goBack(){
                router.go(-1)
            },
            showChapter(){

            }
        }
        return {
            bodyHeight,
            ...methods
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
            height:30%;
            background: rgba($color: #fff, $alpha: .3);
            bottom:30%;
            left:0;
            right:0;
            margin: auto;
            z-index:9;
            padding:20px;
            border-radius: 5px;
            box-shadow: 1px 2px 7px 0px #333;
            .inputItem{
                margin-top: 16px;
                p{
                    font-size: 14px;
                    font-weight: bold;
                    color:#0d1f0e;
                    margin-bottom: 6px;
                }
                input{
                    display: block;
                    background: rgba($color: #333, $alpha: .1);
                    width:100%;
                    height:32px;
                    padding: 0 12px;
                    box-sizing: border-box;
                    color:#687b69;
                    border-radius: 5px;
                    box-shadow: 0px 1px 3px 0px #333;
                    &:focus{

                        box-shadow: 1px 2px 7px 0px #222;
                    }
                }
            }
        }
    }
</style>