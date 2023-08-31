<template>
    <div class="main-news container">
        <section class="main-news__grid">
            <mainArticle v-for="(paper,index) in newsPapers.slice(0,15)" 
                :class="`main-news__item-${index+1}`"
                :id="paper.id"
                :imgUrl="imgUrl(paper.attributes,index)"
                :header="paper.attributes.title"
                :text="paper.attributes.text_preview"
                :time="paper.attributes.time_to_read"
                :createdAt="paper.attributes.createdAt"
                :key="paper.id" />
        </section>
        <section class="main-news__grid-old">
            <mainArticle v-for="(paper,index) in newsPapers.slice(15,23)" 
                :class="{'main-news__horizontal': !(index % 2)}"
                :id="paper.id"
                :imgUrl="oldImgUrl(paper.attributes,index)"
                :header="paper.attributes.title"
                :text="paper.attributes.text_preview"
                :time="paper.attributes.time_to_read"
                :createdAt="paper.attributes.createdAt"
                :isWideArticleDescription="index % 2 ? false : true"
                :key="paper.id" />
        </section>
    </div>
</template>
<script>
import mainArticle from '@components/main-article.vue';
import { getNewsPapers } from '@api/api.js'
export default {
    data() {
        return {
            newsPapers: []
        }
    },
    components: {
        mainArticle
    },
    async created() {
        const papers = await getNewsPapers().then(res => res.json());
        this.newsPapers = papers.data
    },
    methods: {
        imgUrl(attr,index) {
            const ultraWideInds = [1,8,9,10,11];
            if(ultraWideInds.includes(index + 1)) {
                return attr.image_ultrawide.data.attributes.formats.category.url
            } else {
                return attr.image_sq.data.attributes.formats.category_small.url;
            }
        },
        oldImgUrl(attr,index) {
            if(index % 2) {
                return '';
            } else return attr.image_wide.data.attributes.formats.old.url;
        }
    }
}
</script>