<template>
    <article class="main-article">
        <div class="main-article__wrapper">
            <div class="main-article__heading-wrapper">
                <headingItem class="main-article__heading" :title="title" />
                <timesetItem :createdAt="createdAt" :time="time" />
            </div>
            <img :src="`${domain + imgUrl}`" alt="" class="main-article__img" :width="imgSize.width" :height="imgSize.height">
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
import { mapMutations } from 'vuex';
import { END_POINT_DEVDOMAIN } from '@constants';
import timesetItem from '@components/timeset-item.vue';
import socialIcons from '@components/social-icons.vue';
import headingItem from '@components/heading-item.vue';
import { isString, isNumber, isObject, isArray } from '@helpers/validators';
export default {
    props: {
        title: {
            type: String,
            requared: true,
            validator: isString
        },
        createdAt: {
            type: String,
            requared: true,
            validator: isString
        },
        time: {
            type: Number,
            requared: true,
            validator: isNumber
        },
        imgUrl: {
            type: String,
            requared: true,
            validator: isString
        },
        imgSize: {
            type: Object,
            requared: true,
            validator: isObject
        },
        text: {
            type: String,
            requared: true,
            validator: isString
        },
        tags: {
            type: Array,
            requared: false,
            validator: isArray
        }
    },
    components: {
        timesetItem,
        socialIcons,
        headingItem
    },
    computed: {
        domain() {
            return END_POINT_DEVDOMAIN;
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