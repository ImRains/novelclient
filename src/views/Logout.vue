<template>
</template>

<script>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
export default {
    setup() {
        const router = useRouter()
        onMounted(() => {
            // 删除token
            localStorage.removeItem('Authorization_token')
            sessionStorage.clear()
            router.push({
                path:'/'
            })
        })
    },
}
</script>