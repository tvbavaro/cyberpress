<template>
  <div class="main-news" v-show="dataIsReady">
    <filtersApplied
      class="main-news__filters-applied"
      @reset-filters="resetFilters"
      v-show="
        searchTagVuex.length || searchTermVuex || choosenCategoryVuex.length
      "
      :searchTerm="searchTermVuex"
      :searchTag="searchTagVuex"
      :choosenCategory="choosenCategoryVuex"
    />
    <section class="main-news__grid">
      <!-- grid for smartphones -->
      <template v-if="isMobile">
        <previewArticle
          v-for="(paper, index) in newsPapers.slice(0, 1)"
          :id="paper.id"
          :imgUrl="paper.img[this.deviceTypeVuex].category.url"
          :imgSize="getImgSize(paper.img[this.deviceTypeVuex], index)"
          :header="paper.title"
          :text="paper.text_preview"
          :time="paper.time_to_read"
          :createdAt="paper.createdAt"
          :key="paper.id"
        />

        <sliderItem
          :papers="newsPapers.slice(1, 7)"
          refName="slidertop"
          :showImg="true"
        />

        <previewArticle
          v-for="(paper, index) in newsPapers.slice(7, 11)"
          :id="paper.id"
          :imgUrl="paper.img[this.deviceTypeVuex].category.url"
          :imgSize="getImgSize(paper.img[this.deviceTypeVuex], index + 7)"
          :header="paper.title"
          :text="paper.text_preview"
          :time="paper.time_to_read"
          :createdAt="paper.createdAt"
          :key="paper.id"
        />

        <sliderItem
          :papers="newsPapers.slice(11, 15)"
          refName="sliderbottom"
          :showImg="true"
        />
      </template>
      <!--  -->
      <!-- grid for widescreen -->
      <template v-else>
        <previewArticle
          v-for="(paper, index) in newsPapers.slice(0, 15)"
          :class="`main-news__item-${index + 1}`"
          :id="paper.id"
          :imgUrl="imgUrl(paper.img, index)"
          :imgSize="getImgSize(paper.img[this.deviceTypeVuex], index)"
          :header="paper.title"
          :text="paper.text_preview"
          :time="paper.time_to_read"
          :createdAt="paper.createdAt"
          :key="paper.id"
        />
      </template>
      <!--  -->
    </section>
    <section class="main-news__grid-old">
      <template v-if="isMobile">
        <!--подумать над неймингом пропсов, не отражает реального действия -->
        <previewArticle
          v-for="(paper, index) in mobileOldPapersWithImg"
          :id="paper.id"
          class="main-news__horizontal"
          :imgUrl="paper.img[this.deviceTypeVuex].old.url"
          :imgSize="getImgSize(paper.img[this.deviceTypeVuex], index, true)"
          :isTablet="isTablet"
          :isMobile="isMobile"
          :header="paper.title"
          :text="paper.text_preview"
          :time="paper.time_to_read"
          :createdAt="paper.createdAt"
          :key="paper.id"
        />

        <sliderItem
          :papers="mobileOldPapersWithoutImg"
          refName="sliderold"
          :showImg="false"
        />
      </template>
      <template v-else>
        <!--подумать над неймингом пропсов, не отражает реального действия -->
        <previewArticle
          v-for="(paper, index) in newsPapers.slice(15, 23)"
          :id="paper.id"
          :class="{ 'main-news__horizontal': !(index % 2) }"
          :imgUrl="oldImgUrl(paper.img, index)"
          :imgSize="getImgSize(paper.img[this.deviceTypeVuex], index, true)"
          :isTablet="isTablet"
          :isMobile="isMobile"
          :header="paper.title"
          :text="paper.text_preview"
          :time="paper.time_to_read"
          :createdAt="paper.createdAt"
          :isWideArticleDescription="index % 2 ? false : true"
          :key="paper.id"
        />
      </template>
    </section>
  </div>
  <loadItem v-show="!dataIsReady" />
</template>
<script>
import previewArticle from "@components/preview-article.vue";
import filtersApplied from "@components/filters-applied.vue";
import sliderItem from "@components/slider-item.vue";
import loadItem from "@components/load-item.vue";
import { getNewsPapers } from "@api/api.js";
import { mapState, mapMutations } from "vuex";
import { getImgSize } from "../helpers/helpers";
export default {
  data() {
    return {
      newsPapers: [],
      isStartPosition: true,
      isEndPosition: false,
      dataIsReady: false,
    };
  },
  components: {
    previewArticle,
    filtersApplied,
    sliderItem,
    loadItem,
  },
  async created() {
    this.getData();
    this.getImgSize = getImgSize;
  },
  computed: {
    ...mapState({
      searchTermVuex: "searchTerm",
      searchTagVuex: "searchTag",
      deviceTypeVuex: "deviceType",
      isTablet: "isTablet",
      isMobile: "isMobile",
      choosenCategoryVuex: "choosenCategory",
    }),
    mobileOldPapersWithImg() {
      return this.newsPapers.slice(15, 23).filter((paper, index) => {
        if (!(index % 2)) {
          return paper;
        }
      });
    },
    mobileOldPapersWithoutImg() {
      return this.newsPapers.slice(15, 23).filter((paper, index) => {
        if (index % 2) {
          return paper;
        }
      });
    },
  },
  methods: {
    ...mapMutations({
      resetFiltersVuex: "resetFilters",
      setPageURLVuex: "setPageURL",
    }),
    imgUrl(imgs, index) {
      const ultraWideIndx = [1, 8, 9, 10, 11];
      if (ultraWideIndx.includes(index + 1)) {
        return imgs[this.deviceTypeVuex].category.url;
      } else {
        return imgs[this.deviceTypeVuex].category_small.url;
      }
    },
    oldImgUrl(imgs, index) {
      if (index % 2) {
        return "";
      } else return imgs[this.deviceTypeVuex].old.url;
    },
    async getData() {
      this.dataIsReady = false;
      this.newsPapers = await getNewsPapers(
        this.searchTermVuex,
        this.searchTagVuex,
        this.choosenCategoryVuex
      );
      this.dataIsReady = true;
    },
    resetFilters() {
      this.resetFiltersVuex();
      this.setPageURLVuex();
    },
    scrollSlideTo(currenRef, type) {
      const articleWidth = Number(
        this.$refs[currenRef].children[0]
          .getBoundingClientRect()
          .width.toFixed()
      );
      this.$refs[currenRef].scrollBy({
        top: 0,
        left: articleWidth * type,
        behavior: "smooth",
      });
    },
    setSliderArrowsStyle(currenRef) {
      if (this.$refs[currenRef].scrollLeft === 0) {
        this.isStartPosition = true;
      } else if (this.$refs[currenRef].scrollLeft > 0 && this.isStartPosition) {
        this.isStartPosition = false;
      }

      if (
        this.$refs[currenRef].offsetWidth + this.$refs[currenRef].scrollLeft ===
        this.$refs[currenRef].scrollWidth
      ) {
        this.isEndPosition = true;
      } else if (
        this.$refs[currenRef].offsetWidth + this.$refs[currenRef].scrollLeft <
          this.$refs[currenRef].scrollWidth &&
        this.isEndPosition
      ) {
        this.isEndPosition = false;
      }
    },
  },
  watch: {
    searchTermVuex() {
      this.getData();
    },
    searchTagVuex: {
      handler() {
        this.getData();
      },
      deep: true,
    },
    choosenCategoryVuex: {
      handler() {
        this.getData();
      },
      deep: true,
    },
  },
};
</script>
