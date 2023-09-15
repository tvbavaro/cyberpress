<template>
    <div class="main-news">
        <filtersApplied class="main-news__filters-applied" @reset-filters="resetFilters"
            v-show="searchTagVuex || searchTermVuex" :searchTerm="searchTermVuex" :searchTag="searchTagVuex" />
        <section class="main-news__grid">
            <!-- grid for widescreen -->
            <template v-if="deviceTypeVuex === 'desktop' || deviceTypeVuex === 'tablet'">
                <previewArticle v-for="(paper, index) in newsPapers.slice(0, 15)" :class="`main-news__item-${index + 1}`"
                    :id="paper.id" :imgUrl="imgUrl(paper.img, index)" :header="paper.title" :text="paper.text_preview"
                    :time="paper.time_to_read" :createdAt="paper.createdAt" :key="paper.id" />
            </template>
            <!--  -->
            <!-- grid for smartphones -->
            <template v-else>
                <previewArticle v-for="(paper, index) in newsPapers.slice(0, 1)" :id="paper.id"
                    :imgUrl="paper.img[this.deviceTypeVuex].category" :header="paper.title" :text="paper.text_preview"
                    :time="paper.time_to_read" :createdAt="paper.createdAt" :key="paper.id" />
                <div class="slider">
                    <div class="slider__wrapper">
                        <previewArticle v-for="(paper, index) in newsPapers.slice(1, 7)" :id="paper.id"
                            :imgUrl="paper.img[this.deviceTypeVuex].category_small" :header="paper.title"
                            :text="paper.text_preview" :time="paper.time_to_read" :createdAt="paper.createdAt"
                            :key="paper.id" />
                    </div>
                </div>
                <previewArticle v-for="(paper, index) in newsPapers.slice(7, 11)" :id="paper.id"
                    :imgUrl="paper.img[this.deviceTypeVuex].category" :header="paper.title" :text="paper.text_preview"
                    :time="paper.time_to_read" :createdAt="paper.createdAt" :key="paper.id" />
                <div class="slider">
                    <div class="slider__wrapper">
                        <previewArticle v-for="(paper, index) in newsPapers.slice(11, 15)" :id="paper.id"
                            :imgUrl="paper.img[this.deviceTypeVuex].category_small" :header="paper.title"
                            :text="paper.text_preview" :time="paper.time_to_read" :createdAt="paper.createdAt"
                            :key="paper.id" />
                    </div>
                </div>
            </template>
            <!--  -->
        </section>
        <section class="main-news__grid-old">
            <previewArticle v-for="(paper, index) in newsPapers.slice(15, 23)" :id="paper.id"
                :class="{ 'main-news__horizontal': !(index % 2) }" :imgUrl="oldImgUrl(paper.img, index)"
                :isTablet="deviceTypeVuex === 'tablet' ? true : false" :header="paper.title" :text="paper.text_preview"
                :time="paper.time_to_read" :createdAt="paper.createdAt" :isWideArticleDescription="index % 2 ? false : true"
                :key="paper.id" />
        </section>
    </div>
</template>
<script>
import previewArticle from '@components/preview-article.vue';
import filtersApplied from '@components/filters-applied.vue';
import { getNewsPapers } from '@api/api.js';
import { mapState, mapMutations } from 'vuex';
export default {
    data() {
        return {
            newsPapers: []
        }
    },
    //ultraWideInds: [1, 8, 9, 10, 11],
    components: {
        previewArticle,
        filtersApplied
    },
    async created() {
        this.getData();
    },
    computed: {
        ...mapState({
            searchTermVuex: 'searchTerm',
            searchTagVuex: 'searchTag',
            deviceTypeVuex: 'deviceType'
        })
    },
    methods: {
        ...mapMutations({
            setSearchTagVuex: 'setSearchTag',
            setSearchTermVuex: 'setSearchTerm'
        }),
        imgUrl(imgs, index) {
            const ultraWideInds = [1, 8, 9, 10, 11];
            if (ultraWideInds.includes(index + 1)) {
                return imgs[this.deviceTypeVuex].category;
            } else {
                return imgs[this.deviceTypeVuex].category_small;
            }
        },
        oldImgUrl(imgs, index) {
            if (index % 2) {
                return '';
            } else return imgs[this.deviceTypeVuex].old;
        },
        async getData() {
            this.newsPapers = await getNewsPapers(this.searchTermVuex, this.searchTagVuex);
        },
        resetFilters() {
            this.setSearchTagVuex('');
            this.setSearchTermVuex('');
        }
    },
    watch: {
        searchTermVuex() {
            this.getData();
        },
        searchTagVuex() {
            this.getData();
        }
    }
}
</script>