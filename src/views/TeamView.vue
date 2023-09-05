<template>
    <projectArticle v-if="dataIsReady" :title="articleData.title" :img="articleData.img.desktop" :slogan="articleData.slogan" :text="articleData.text"/>
</template>
<script>
import projectArticle from '@components/project-article.vue';
import { getProject } from '@api/api';
export default {
    data() {
        return {
            articleData: null,
            dataIsReady: false,
            type: 'team'
        }
    },
    components: {
        projectArticle
    },
    async created() {
        this.articleData = await getProject(this.type);
        if (this.articleData) {
            this.dataIsReady = true;
        }
    },
}
</script>