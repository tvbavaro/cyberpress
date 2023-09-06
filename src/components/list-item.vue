<template>
    <ul class="list__column">
        <li class="list__item"><h3 class="list__header">{{ title }}</h3></li>
        <li class="list__item" v-for="item in list" :key="item"><span class="list__text">{{ item }}</span></li>
    </ul>
</template>
<script>
export default {
    props: {
        title: {
            type: String
        },
        list: {
            type: Array
        }
    }
}
</script>