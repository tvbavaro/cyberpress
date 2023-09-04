<template>
    <div class="main-news">
        <section class="main-news__grid">
            <previewArticle v-for="(paper,index) in newsPapers.slice(0,15)" 
                :class="`main-news__item-${index+1}`"
                :id="paper.id"
                :imgUrl="imgUrl(paper.img,index)"
                :header="paper.title"
                :text="paper.text_preview"
                :time="paper.time_to_read"
                :createdAt="paper.createdAt"
                :key="paper.id" />
        </section>
        <section class="main-news__grid-old">
            <previewArticle v-for="(paper,index) in newsPapers.slice(15,23)" 
                :id="paper.id"
                :class="{'main-news__horizontal': !(index % 2)}"
                :imgUrl="oldImgUrl(paper.img,index)"
                :header="paper.title"
                :text="paper.text_preview"
                :time="paper.time_to_read"
                :createdAt="paper.createdAt"
                :isWideArticleDescription="index % 2 ? false : true"
                :key="paper.id" />
        </section>
    </div>
</template>
<script>
import previewArticle from '@components/preview-article.vue';
import { getNewsPapers } from '@api/api.js'
export default {
    data() {
        return {
            newsPapers: []
        }
    },
    components: {
        previewArticle
    },
    async created() {
        this.newsPapers = await getNewsPapers().then(res => res);
    },
    methods: {
        imgUrl(imgs,index) {
            const ultraWideInds = [1,8,9,10,11];
            if(ultraWideInds.includes(index + 1)) {
                return imgs.category;
            } else {
                return imgs.category_small;
            }
        },
        oldImgUrl(imgs,index) {
            if(index % 2) {
                return '';
            } else return imgs.old;
        }
    }
}
</script>