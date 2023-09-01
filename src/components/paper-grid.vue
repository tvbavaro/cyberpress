<template>
    <div class="paper">
        <div class="paper__grid">
            <mainArticle class="paper__main-article" :title="paper?.attributes?.title" :text="paper.attributes.text_article"
                :tags="tags" :imgUrl="imgUrl" :createdAt="paper.attributes.createdAt" :time="paper.attributes.time_to_read"/>
            <aside class="recommended paper__recommended">
                <div class="recommended__wrapper">
                        <span class="recommended__heading">Recommended</span> 
                    <previewArticle v-for="(paper, index) in recommended" :id="paper.id"
                        :imgUrl="paper.attributes.image_sq.data.attributes.formats.aside.url"
                        :header="paper.attributes.title" :text="paper.attributes.text_preview"
                        :time="paper.attributes.time_to_read" :createdAt="paper.attributes.createdAt" :key="paper.id" />
                </div>
            </aside>
            <div class="similar paper__similar">
                <div class="similar__wrapper">
                    <span class="similar__heading">Similar</span>
                    <previewArticle :id="similar.id" class="paper__horizontal"
                        :imgUrl="similar?.attributes.image_wide.data.attributes.formats.old.url"
                        :header="similar.attributes.title" :text="similar.attributes.text_preview"
                        :time="similar.attributes.time_to_read" :createdAt="similar.attributes.createdAt"
                        :key="similar.id" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { DEVDOMAIN } from '@constants';
import { getPaper, getRecommended, getSimilar } from '@api/api.js';
import previewArticle from '@components/preview-article.vue';
import mainArticle from '@components/main-article.vue';

export default {
    data() {
        return {
            paper: null,
            recommended: null,
            similar: null
        }
    },
    props: {
        id: { //from routes
            type: String,
            required: true
        }
    },
    components: {
        previewArticle,
        mainArticle
    },
    async created() {
        this.paper = await getPaper(this.id).then(res => res.json()).then(fetchData => fetchData.data);
        this.recommended = await getRecommended().then(res => res.json()).then(fetchData => fetchData.data);
        this.similar = await getSimilar(this.id - 3).then(res => res.json()).then(fetchData => fetchData.data);
        console.log(this.similar)
    },
    computed: {
        domain() {
            return DEVDOMAIN;
        },
        imgUrl() {
            return this.paper.attributes.image_ultrawide.data.attributes.url;
        },
        tags() {
            return this.paper.attributes.tags.value.split(/\s/);
        }
    }
}
</script>