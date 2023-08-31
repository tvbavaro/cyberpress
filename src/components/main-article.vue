<template>
    <article class="paper main-news__article" @click="handleClick(id)">
        <div class="paper__img-wrapper">
            <img v-if="imgUrl" class="paper__img" :src="`http://${domain + imgUrl}`" alt="">
        </div>
        <div class="paper__description" :class="{'paper__description-wide': isWideArticleDescription}">
            <h2 class="paper__header">{{ header }}</h2>
            <p class="paper__text">{{ text }}</p>
            <span class="paper__time">{{ createdDate }}
                <img class="paper__time-divider" src="@assets/24x24/divider.svg" alt="">
                {{ time }} min read</span>
        </div>
    </article>
</template>
<script>
import { DEVDOMAIN } from '@constants';
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
            this.$router.push({name: 'paper', params: {id:id}});
            console.log(this.$router);
        }
    }
}
</script>