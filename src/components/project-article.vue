<template>
    <article class="project-article">
        <div class="project-article__wrapper">
            <headingItem :title="title" />
            <div class="project-article__content-wrapper">
                <img class="project-article__img" :src="`http://${domain + img}`" alt="">
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