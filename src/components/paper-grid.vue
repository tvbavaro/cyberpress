<template>
    <div class="paper" v-if="dataReady">
        <div class="paper__grid">
            <mainArticle class="paper__main-article" :title="paper.title" :text="paper.text_article" :tags="tags"
                :imgUrl="imgUrl" :createdAt="paper.createdAt" :time="paper.time_to_read" />
            <aside class="recommended paper__recommended">
                <div class="recommended__wrapper">
                    <span class="recommended__heading">Recommended</span>
                    <previewArticle v-for="(paperRec, index) in recommended" :id="paperRec.id"
                        :imgUrl="paperRec.attributes.image_sq.data.attributes.formats.aside.url"
                        :header="paperRec.attributes.title" :text="paperRec.attributes.text_preview"
                        :time="paperRec.attributes.time_to_read" :createdAt="paperRec.attributes.createdAt" :key="paperRec.id" />
                </div>
            </aside>
            <div class="similar paper__similar">
                <div class="similar__wrapper">
                    <span class="similar__heading">Similar&nbsp;to</span>
                    <previewArticle :id="similar.id" class="paper__horizontal"
                        :imgUrl="similar.attributes.image_wide.data.attributes.formats.old.url"
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
            similar: null,
            dataReady: false,
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
        this.paper = await getPaper(this.id);
        this.recommended = await getRecommended().then(res => res.json()).then(fetchData => fetchData.data);
        this.similar = await getSimilar(this.id - 3).then(res => res.json()).then(fetchData => fetchData.data);
        if (this.paper !== null && this.recommended && this.similar) {
            this.dataReady = true;
        }
    },
    computed: {
        domain() {
            return DEVDOMAIN;
        },
        imgUrl() {
            return this.paper.img.desktop;
        },
        tags() {
            return this.paper.tags.split(/\s/);
        }
    },
    watch: {
        async id() {
            this.paper = await getPaper(this.id).then(res => res.json()).then(fetchData => fetchData.data);
            this.recommended = await getRecommended().then(res => res.json()).then(fetchData => fetchData.data);
            this.similar = await getSimilar(this.id - 3).then(res => res.json()).then(fetchData => fetchData.data);
        }
    }
}
</script>