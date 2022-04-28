<template>
    <div>
        404
    </div>
</template>

<script>
import { onMounted, getCurrentInstance } from 'vue'
export default {
    setup() {
        const { proxy } = getCurrentInstance()
        onMounted(() => {
            proxy.$router.push('/')
        })
    },
}
</script>