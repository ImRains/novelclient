<template>
    <div v-for="(item) in novelLsit" :key = item.id>
        <div>
            <img src="" alt="">
        </div>
        <p></p>
    </div>
</template>

<script>
export default {
    props:{
        novelLsit: Array
    },
    setup() {
        
    },
}
</script>