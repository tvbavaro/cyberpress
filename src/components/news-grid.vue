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
                <sliderItem :papers="newsPapers.slice(1, 7)" refName="slidertop" :deviceType="deviceTypeVuex" :showImg="true"/>

                <previewArticle v-for="(paper, index) in newsPapers.slice(7, 11)" :id="paper.id"
                    :imgUrl="paper.img[this.deviceTypeVuex].category" :header="paper.title" :text="paper.text_preview"
                    :time="paper.time_to_read" :createdAt="paper.createdAt" :key="paper.id" />
                <sliderItem :papers="newsPapers.slice(11, 15)" refName="sliderbottom" :deviceType="deviceTypeVuex" :showImg="true"/>
            </template>
            <!--  -->
        </section>
        <section class="main-news__grid-old">
            <template v-if="deviceTypeVuex === 'desktop' || deviceTypeVuex === 'tablet'">
                <previewArticle v-for="(paper, index) in newsPapers.slice(15, 23)" :id="paper.id"
                    :class="{ 'main-news__horizontal': !(index % 2) }" :imgUrl="oldImgUrl(paper.img, index)"
                    :isTablet="deviceTypeVuex === 'tablet' ? true : false"
                    :isMobile="deviceTypeVuex === 'mobile' ? true : false" :header="paper.title" :text="paper.text_preview"
                    :time="paper.time_to_read" :createdAt="paper.createdAt"
                    :isWideArticleDescription="index % 2 ? false : true" :key="paper.id" />
            </template>
            <template v-else>
                <previewArticle v-for="(paper, index) in mobileOldPapersWithImg" :id="paper.id"
                    class="main-news__horizontal" :imgUrl="paper.img[this.deviceTypeVuex].old"
                    :isTablet="deviceTypeVuex === 'tablet' ? true : false"
                    :isMobile="deviceTypeVuex === 'mobile' ? true : false" :header="paper.title" :text="paper.text_preview"
                    :time="paper.time_to_read" :createdAt="paper.createdAt" :key="paper.id" />
                <sliderItem :papers="mobileOldPapersWithoutImg" refName="sliderold" :deviceType="deviceTypeVuex" :showImg="false"/>
            </template>

        </section>
    </div>
</template>
<script>
import previewArticle from '@components/preview-article.vue';
import filtersApplied from '@components/filters-applied.vue';
import sliderItem from './slider-item.vue';
import { getNewsPapers } from '@api/api.js';
import { mapState, mapMutations } from 'vuex';
export default {
    data() {
        return {
            newsPapers: [],
            isStartPosition: true,
            isEndPosition: false
        }
    },
    //ultraWideInds: [1, 8, 9, 10, 11],
    components: {
        previewArticle,
        filtersApplied,
        sliderItem
    },
    async created() {
        this.getData();
    },
    mounted() {
        if (Object.keys(this.$refs).length) {
            //this.$refs.slidertop.addEventListener('scroll', () => this.setSliderArrowsStyle('slidertop'));
            //this.$refs.sliderbottom.addEventListener('scroll', () => this.setSliderArrowsStyle('sliderbottom'));
            this.$refs.sliderold.addEventListener('scroll', () => this.setSliderArrowsStyle('sliderold'));
        }
    },
    beforeUnmount() {
        if (Object.keys(this.$refs).length) {
            //this.$refs.slidertop.removeEventListener('scroll', () => this.setSliderArrowsStyle);
            //this.$refs.sliderbottom.removeEventListener('scroll', () => this.setSliderArrowsStyle);
            this.$refs.sliderold.removeEventListener('scroll', () => this.setSliderArrowsStyle);
        }
    },
    computed: {
        ...mapState({
            searchTermVuex: 'searchTerm',
            searchTagVuex: 'searchTag',
            deviceTypeVuex: 'deviceType'
        }),
        mobileOldPapersWithImg() {
            return this.newsPapers.slice(15, 23).filter((paper, index) => {
                if (!(index % 2)) {
                    return paper
                }
            });
        },
        mobileOldPapersWithoutImg() {
            return this.newsPapers.slice(15, 23).filter((paper, index) => {
                if ((index % 2)) {
                    return paper
                }
            });
        }
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
        },
        scrollSlideTo(currenRef, type) {
            const articleWidth = Number(this.$refs[currenRef].children[0].getBoundingClientRect().width.toFixed());
            this.$refs[currenRef].scrollBy({
                top: 0,
                left: articleWidth * type,
                behavior: 'smooth'
            });
        },
        setSliderArrowsStyle(currenRef) {
            if (this.$refs[currenRef].scrollLeft === 0) {
                this.isStartPosition = true;
            } else if (this.$refs[currenRef].scrollLeft > 0 &&
                this.isStartPosition) {
                this.isStartPosition = false;
            }

            if (this.$refs[currenRef].offsetWidth + this.$refs[currenRef].scrollLeft
                === this.$refs[currenRef].scrollWidth) {
                this.isEndPosition = true;
            } else if (this.$refs[currenRef].offsetWidth +
                this.$refs[currenRef].scrollLeft <
                this.$refs[currenRef].scrollWidth &&
                this.isEndPosition) {
                this.isEndPosition = false;
            }
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