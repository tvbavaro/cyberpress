<template>
    <article class="paper main-news__article">
        <div class="paper__img-wrapper">
            <img class="paper__img" :src="`http://${domain+imgUrl}`" alt="">
        </div>
        <div class="paper__description">
            <h2 class="paper__header">{{ header }}</h2>
            <p class="paper__text">{{ text }}</p>
        </div>
    </article>
</template>

<script>
import { DEVDOMAIN } from '@constants';
export default {
    props: {
        imgUrl: {
            type: String
        },
        header: {
            type: String
        },
        text: {
            type: String
        }
    },
    computed: {
        domain() {
            return DEVDOMAIN;
        }
    }
}
</script>