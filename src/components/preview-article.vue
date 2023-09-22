<template>
    <article class="preview-article" @click="handleClick()">
        <img v-if="imgUrl"
                    class="preview-article__img" 
                    :class="[{'preview-article__img-tablet': isTablet},{'preview-article__img-mobile': isMobile}]" 
                    :src="`http://${domain + imgUrl}`" alt="">
        <div class="preview-article__description"
            :class="{ 'preview-article__description-wide': isWideArticleDescription }">
            <h2 class="preview-article__header" :class="{'preview-article__header-mob_pd': isMobile}">{{ header }}</h2>
            <p class="preview-article__text">{{ text }}</p>
            <timesetItem v-if="time" :createdDate="createdDate" :time="time" />
        </div>
    </article>
</template>


<script>
import { DEVDOMAIN } from '@constants';
import timesetItem from '@components/timeset-item.vue';
import { mapState } from 'vuex';
export default {
    props: {
        id: {
            type: Number,
        },
        page: {
            type: String
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
            default: false
        },
        isTablet: {
            type: Boolean
        },
        isMobile: {
            type: Boolean
        }
    },
    components: {
        timesetItem,
    },
    computed: {
        ...mapState({
            deviceTypeVuex: 'deviceType',
        }),
        domain() {
            return DEVDOMAIN;
        },
        createdDate() {
            return new Date(this.createdAt).toGMTString()
                .match(/([A-Za-z]{3}\s\d{2})|(\d{2}:\d{2})/g)?.join(', ');
        },
    },
    methods: {
        handleClick() {
            if (this.id) {
                this.$router.push({ name: 'paper', params: { id: this.id } });
            } else {
                this.$router.push({ name: this.page });
            }

        }
    }
}
</script>