<template>
    <article class="preview-article" @click="handleClick(id)">
            <div class="preview-article__img-wrapper">
                <img v-if="imgUrl" class="preview-article__img" :src="`http://${domain + imgUrl}`" alt="">
            </div>
            <div class="preview-article__description" :class="{ 'preview-article__description-wide': isWideArticleDescription }">
                <h2 class="preview-article__header">{{ header }}</h2>
                <p class="preview-article__text">{{ text }}</p>
                <timesetItem :createdDate="createdDate" :time="time"/>
            </div>
    </article>
</template>
<script>
import { DEVDOMAIN } from '@constants';
import timesetItem from '@components/timeset-item.vue';
export default {
    props: {
        id: {
            type: Number,
            required: true
        },
        imgUrl: {
            type: String
        },
        header: {
            type: String
        },
        text: {
            type: String
        },
        time: {
            type: Number
        },
        createdAt: {
            type: String
        },
        isWideArticleDescription: {
            type: Boolean,
            default: true
        }
    },
    components: {
        timesetItem
    },
    created() {

    },
    computed: {
        domain() {
            return DEVDOMAIN;
        },
        createdDate() {
            return new Date(this.createdAt).toGMTString()
                .match(/([A-Za-z]{3}\s\d{2})|(\d{2}:\d{2})/g).join(', ');
        }
    },
    methods: {
        handleClick(id) {
            this.$router.push({ name: 'paper', params: { id: id } });
        }
    }
}
</script>