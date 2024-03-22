<template>
  <article
    class="preview-article"
    @click="handleClick()"
    @keydown.enter="handleClick()"
    tabindex="0"
  >
    <img
      v-if="imgUrl"
      :class="imgClasses"
      :src="`${domain + imgUrl}`"
      alt=""
      :width="imgSize.width"
      :height="imgSize.height"
    />
    <div :class="descriptionClasses">
      <h2 :class="h2Classes">
        {{ header }}
      </h2>
      <p class="preview-article__text">{{ text }}</p>
      <timesetItem v-if="time" :createdAt="createdAt" :time="time" />
    </div>
  </article>
</template>

<script>
import { END_POINT_DEVDOMAIN } from "@constants";
import { PAGE_PAPER } from "../router/routes";
import timesetItem from "@components/timeset-item.vue";
import { mapState } from "vuex";

export default {
  props: {
    id: {
      type: Number,
    },
    page: {
      requared: false,
      default: null,
      type: String,
    },
    imgUrl: {
      type: String,
    },
    imgSize: {
      type: Object,
      requared: true,
    },
    header: {
      type: String,
    },
    text: {
      type: String,
    },
    time: {
      type: Number,
    },
    createdAt: {
      type: String,
    },
    isWideArticleDescription: {
      type: Boolean,
      default: false,
    },
    isTablet: {
      type: Boolean,
    },
    isMobile: {
      type: Boolean,
    },
  },
  components: {
    timesetItem,
  },
  computed: {
    ...mapState({
      deviceTypeVuex: "deviceType",
    }),
    domain() {
      return END_POINT_DEVDOMAIN;
    },
    imgClasses() {
      return [
        "preview-article__img",
        { "preview-article__img-tablet": this.isTablet },
        { "preview-article__img-mobile": this.isMobile },
      ];
    },
    h2Classes() {
      return [
        "preview-article__header",
        { "preview-article__header-mob_pd": this.isMobile },
      ];
    },
    descriptionClasses() {
      return [
        "preview-article__description",
        { "preview-article__description-wide": this.isWideArticleDescription },
      ];
    },
  },
  methods: {
    handleClick() {
      if (this.id) {
        this.$router.push({ name: PAGE_PAPER, params: { id: this.id } });
      } else {
        this.$router.push({ name: this.page });
      }
    },
  },
};
</script>
