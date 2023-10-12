<template>
    <article class="main-article">
        <div class="main-article__wrapper">
            <div class="main-article__heading-wrapper">
                <headingItem class="main-article__heading" :title="title" />
                <timesetItem :createdDate="createdDate" :time="time" />
            </div>
            <img :src="`${domain + imgUrl}`" alt="" class="main-article__img">
            <div class="main-article__wrapper-content">
                <p class="main-article__text">
                    {{ text }}
                </p>
                <div class="main-article__footer">
                    <div class="tags">
                        <ul class="tags__column" v-for="tag in tags" :key="tag">
                            <li class="tags__item" @click="handleClickSetSearchTag(tag)">{{ tag }}</li>
                        </ul>
                    </div>
                    <div class="share">
                        <div class="share__wrapper">
                            <span class="share__heading">Share on:</span>
                            <socialIcons class="main-article__social" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </article>
</template>
<script>
import { DEVDOMAIN } from '@constants';
import { mapMutations } from 'vuex';
import timesetItem from '@components/timeset-item.vue';
import socialIcons from '@components/social-icons.vue';
import headingItem from '@components/heading-item.vue';
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
        socialIcons,
        headingItem
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
        ...mapMutations({
            setSearchTagVuex: 'setSearchTag'
        }),
        handleClickSetSearchTag(tagValue) {
            this.setSearchTagVuex(tagValue);
            this.$router.push({ name: 'main' });
        }
    }
}
</script>