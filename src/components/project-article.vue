<template>
    <article class="project-article">
        <div class="project-article__wrapper">
            <div class="project-article__heading-wrapper">
                <headingItem :title="title" />
            </div>
            <div class="project-article__content-wrapper">
                <div class="project-article__img-wrapper">
                    <img class="project-article__img" :src="`${domain + img}`" alt="" :width="imgSize.width" :height="imgSize.height">
                </div>
                <!-- :width="imgSize.width" :height="imgSize.height" -->
                <div class="project-article__text-wrapper">
                    <textItem :text="text" />
                    <span class="slogan">{{ slogan }}</span>
                </div>
            </div>
        </div>
    </article>
</template>
<script>

import headingItem from '@components/heading-item.vue';
import textItem from '@components/text-item.vue';
import { DEVDOMAIN } from '@constants';
export default {
    props: {
        title: {
            type: String
        },
        img: {
            type: String
        },
        imgSize: {
            type: Object
        },
        text: {
            type: String
        },
        slogan: {
            type: String
        }
    },
    components: {
        headingItem,
        textItem
    },
    computed: {
        domain() {
            return DEVDOMAIN;
        },
    }
}
</script>