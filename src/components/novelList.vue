<template>
    <ul class="novel-list">
        <li class="" v-for="(item) in novelList" :key = item.id @click="goNovelInfo(item)">
            <div>
                <img :src="item.cover" alt="">
            </div>
            <p>{{item.title}}</p>
        </li>
    </ul>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
    props:{
        novelList: Array
    },
    setup() {
        const router = useRouter()
        const methods = {
            goNovelInfo(info){
                router.push({
                    path:'novelinfo',
                    query:{
                        title:info.title,
                        source:info.source,
                        sourceUrl:encodeURIComponent(info.sourceUrl)
                    }
                })
            }
        }
        return {
            ...methods
        }
    },
}
</script>

<style lang="scss" scoped>
.novel-list{
    display: flex;
    flex-wrap: wrap;
    li{
        display: inline-block;
        box-sizing: border-box;
        width: 33%;
        padding:10px;
        div{
            height:120px;
            box-shadow: 1px 2px 7px 0px #333;
            border:1px solid #f1f1f1;
            border-radius: 2px;
            overflow: hidden;
            img{
                display: block;
                width:100%;
                height:100%;
            }
        }
        p{
            margin-top: 4px;
            text-align: center;
            font-size: 12px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow:ellipsis;
        }
    }
}
</style>