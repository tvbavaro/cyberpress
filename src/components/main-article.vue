<template>
    <article class="main-article">
        <div class="main-article__wrapper">
            <div class="main-article__heading-wrapper">
                <h1 class="main-article__heading">
                    {{ title }}
                </h1>
                <timesetItem :createdDate="createdDate" :time="time" />
            </div>
            <img :src="`http://${domain + imgUrl}`" alt="" class="main-article__img">
            <div class="main-article__wrapper-content">
                <p class="main-article__text">
                {{ text }}
            </p>
            <div class="main-article__footer">
                <div class="main-article__foter-wrapper">
                    <div class="tags">
                        <ul class="tags__column" v-for="tag in tags" :key="tag">
                            <li class="tags__item">{{ tag }}</li>
                        </ul>
                    </div>
                    <div class="share">
                        <span class="share__text">Share on:</span>
                        <div class="social">
                            <img class="social__twitter-icon" src="@assets/24x24/twitter.svg" alt="">
                            <img class="social__telegram-icon" src="@assets/24x24/telegram.svg" alt="">
                            <img class="social__youtube-icon" src="@assets/24x24/youtube.svg" alt="">
                        </div>
                    </div>
                </div>
            </div>
            </div>

        </div>
    </article>
</template>
<script>
import { DEVDOMAIN } from '@constants';
import timesetItem from '@components/timeset-item.vue';
export default {
    props: {
        title: {
            type: String,
            requared: true
        },
        createdAt: {
            type: String,
            requared: true
        },
        time: {
            type: Number,
            requared: true
        },
        imgUrl: {
            type: String,
            requared: true
        },
        text: {
            type: String,
            requared: true
        },
        tags: {
            type: Array,
            requared: false
        }
    },
    components: {
        timesetItem,
    },
    computed: {
        domain() {
            return DEVDOMAIN;
        },
        createdDate() {
            return new Date(this.createdAt).toGMTString()
                .match(/([A-Za-z]{3}\s\d{2})|(\d{2}:\d{2})/g).join(', ');
        }
    }
}
</script>