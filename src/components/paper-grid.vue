<template>
    <div class="project" v-if="dataIsReady">
        <div class="project__grid">
            <mainArticle class="project__main-paper" :title="paper.title" :text="paper.text_article" :tags="tags"
                :imgUrl="imgUrl" :imgSize="imgSize" :createdAt="paper.createdAt" :time="paper.time_to_read" />
            <aside class="recommended project__recommended" v-if="recommended?.length">
                <div class="recommended__wrapper">
                    <span class="recommended__heading">Recommended</span>
                    <div class="recommended__articles-wrapper">
                        <previewArticle v-for="(paperRec, index) in recommended.slice(0, 2)" :id="paperRec.id"
                            :imgUrl="paperRec.img[this.deviceTypeVuex].url" :imgSize="imgRecSize" :header="paperRec.title"
                            :text="paperRec.text_preview" :time="paperRec.time_to_read" :createdAt="paperRec.createdAt"
                            :key="paperRec.id" />
                    </div>

                </div>
            </aside>
            <div class="similar project__similar" v-if="similar">
                <div class="similar__wrapper">
                    <span class="similar__heading">Similar to</span>
                    <previewArticle :id="similar.id" class="project__horizontal" :imgUrl="similar.img[this.deviceTypeVuex].url"
                        :imgSize="imgSimilarSize" :isTablet="isTablet" :isMobile="isMobile"
                        :isWideArticleDescription="!deviceTypeVuex === 'mobile' ? true : false" :header="similar.title"
                        :text="similar.text_preview" :time="similar.time_to_read" :createdAt="similar.createdAt"
                        :key="similar.id" />
                </div>
            </div>
        </div>
    </div>
    <loadItem v-else />
</template>

<script>
import { DEVDOMAIN } from '@constants';
import { getPaper, getRecommended, getSimilar } from '@api/api.js';
import previewArticle from '@components/preview-article.vue';
import mainArticle from '@components/main-article.vue';
import loadItem from '@components/load-item.vue';
import { mapState } from 'vuex';

export default {
    data() {
        return {
            paper: null,
            recommended: null,
            similar: null,
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
        mainArticle,
        loadItem
    },
    created() {
        this.getData();
    },
    computed: {
        ...mapState({
            deviceTypeVuex: 'deviceType',
            isTablet: 'isTablet',
            isMobile: 'isMobile'
        }),
        domain() {
            return DEVDOMAIN;
        },
        imgUrl() {
            return this.paper.img[this.deviceTypeVuex].url;
        },
        imgSize() {
            const { width, height } = this.paper.img[this.deviceTypeVuex];
            return {
                width,
                height
            }
        },
        imgRecSize() {
            if (this.recommended.length) {
                const { width, height } = this.recommended[0].img[this.deviceTypeVuex];
                return {
                    width,
                    height
                }
            } else return false;
        },
        imgSimilarSize() {
            if (this.similar) {
                const { width, height } = this.similar.img[this.deviceTypeVuex];
                return {
                    width,
                    height
                }
            } else return false;
        },
        tags() {
            return this.paper.tags.split(/\s/);
        },
        dataIsReady() {
            if (this.paper !== null) {
                return true;
            } else return false;
        }
    },
    methods: {
        async getData() {
            this.paper = await getPaper(this.id);
            this.recommended = await getRecommended(this.id, this.tags);
            const recIds = this.recommended.map(rec => rec.id);
            this.similar = await getSimilar([this.id, ...recIds], Array.from(this.paper.categories)).then(arr => arr[0]);
        },
    },
    watch: {
        async id() {
            this.paper = this.recommended = this.similar = null;
            this.getData();
        }
    }
}
</script>