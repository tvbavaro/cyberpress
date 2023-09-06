<template>
    <div class="project">
        <div class="project__grid" v-if="dataIsReady">
            <mainArticle class="project__main-paper" :title="paper.title" :text="paper.text_article" :tags="tags"
                :imgUrl="imgUrl" :createdAt="paper.createdAt" :time="paper.time_to_read" />
            <aside class="recommended project__recommended">
                <div class="recommended__wrapper">
                    <span class="recommended__heading">Recommended</span>
                    <previewArticle v-for="(paperRec, index) in recommended" :id="paperRec.id"
                        :imgUrl="paperRec.img.aside_desktop" :header="paperRec.title" :text="paperRec.text_preview"
                        :time="paperRec.time_to_read" :createdAt="paperRec.createdAt" :key="paperRec.id" />
                </div>
            </aside>
            <div class="similar project__similar">
                <div class="similar__wrapper">
                    <span class="similar__heading">Similar to</span>
                    <previewArticle :id="similar.id" class="project__horizontal" :imgUrl="similar.img.desktop"
                        :header="similar.title" :text="similar.text_preview" :time="similar.time_to_read"
                        :createdAt="similar.createdAt" :key="similar.id" />
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
            dataIsReady: false,
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
        this.recommended = await getRecommended();
        this.similar = await getSimilar(this.id - 3);
        console.log(this.similar)
        if (this.paper !== null && this.recommended && this.similar) {
            this.dataIsReady = true;
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
            this.paper = await getPaper(this.id);
            this.recommended = await getRecommended();
            this.similar = await getSimilar(this.id - 3);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
}
</script>