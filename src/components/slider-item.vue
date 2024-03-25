<template>
  <div class="slider" v-if="papers.length">
    <div class="slider__divider"></div>
    <div class="slider__wrapper">
      <div
        class="slider__list"
        :class="{ slider__list_old: !showImg }"
        :ref="refName"
        @scroll="setSliderArrowsStyle(refName)"
      >
        <previewArticle
          v-for="(paper, index) in papers"
          :id="paper.id"
          :imgUrl="
            showImg ? paper.img[this.deviceTypeVuex].category_small.url : null
          "
          :imgSize="getImgSize(paper.img[this.deviceTypeVuex], index)"
          :header="paper.title"
          :text="paper.text_preview"
          :time="paper.time_to_read"
          :createdAt="paper.createdAt"
          :key="paper.id"
        />
      </div>
    </div>
    <div class="slider__nav-wrapper">
      <button
        class="slider__arrow"
        :class="{ slider__arrow_unactive: isStartPosition }"
        @click="scrollSlideTo(refName, -1)"
      >
        <baseIcon :name="ICON_ARROW_LEFT"/>
      </button>
      <button
        class="slider__arrow"
        :class="{
          slider__arrow_unactive: isEndPosition || notEnoughtDataForSlider,
        }"
        @click="scrollSlideTo(refName, 1)"
      >
        <baseIcon :name="ICON_ARROW_RIGHT"/>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import previewArticle from "@components/preview-article.vue";
import baseIcon from "@components/base-icon.vue";
import { ICON_ARROW_LEFT, ICON_ARROW_RIGHT } from "@icons";
import { getImgSize } from "@helpers/helpers";
import { isArray, isString, isBoolean } from '@helpers/validators';

export default {
  data() {
    return {
      ICON_ARROW_LEFT,
      ICON_ARROW_RIGHT,
      isStartPosition: true,
      isEndPosition: false,
    };
  },
  props: {
    papers: {
      type: Array,
      validator: isArray
    },
    refName: {
      type: String,
      validator: isString
    },
    showImg: {
      type: Boolean,
      validator: isBoolean
    },
  },
  components: {
    previewArticle,
    baseIcon,
  },
  created() {
    this.getImgSize = getImgSize;
  },
  computed: {
    ...mapState({
      deviceTypeVuex: "deviceType",
    }),
    notEnoughtDataForSlider() {
      if (this.papers.length < 3) {
        return true;
      } else false;
    },
  },
  methods: {
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
      const refElement = this.$refs[currenRef],
        scrollArea = refElement.scrollWidth,
        scrolledAlready = Number(refElement.scrollLeft.toFixed()),
        zoneVisible = refElement.offsetWidth;

      if (scrolledAlready === 0) {
        this.isStartPosition = true;
      } else if (scrolledAlready > 0 && this.isStartPosition) {
        this.isStartPosition = false;
      }

      if (zoneVisible + scrolledAlready === scrollArea) {
        this.isEndPosition = true;
      } else if (
        zoneVisible + scrolledAlready < scrollArea &&
        this.isEndPosition
      ) {
        this.isEndPosition = false;
      }
    },
  },
};
</script>
