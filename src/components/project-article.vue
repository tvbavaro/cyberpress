<template>
  <article class="project-article">
    <div class="project-article__wrapper">
      <div class="project-article__heading-wrapper">
        <headingItem :title="title" />
      </div>
      <div class="project-article__content-wrapper">
        <div class="project-article__img-wrapper">
          <img
            class="project-article__img"
            :src="`${domain + img}`"
            alt=""
            :width="imgSize.width"
            :height="imgSize.height"
          />
        </div>
        <div class="project-article__text-wrapper">
          <textItem :text="text" />
          <span class="slogan">{{ slogan }}</span>
        </div>
      </div>
    </div>
  </article>
</template>
<script>
import headingItem from "@components/heading-item.vue";
import textItem from "@components/text-item.vue";
import { END_POINT_DEVDOMAIN } from "@constants";
import { isString, isObject } from '@helpers/validators';

export default {
  props: {
    title: {
      type: String,
      validator: isString
    },
    img: {
      type: String,
      validator: isString
    },
    imgSize: {
      type: Object,
      validator: isObject
    },
    text: {
      type: String,
      validator: isString
    },
    slogan: {
      type: String,
      validator: isString
    },
  },
  components: {
    headingItem,
    textItem,
  },
  computed: {
    domain() {
      return END_POINT_DEVDOMAIN;
    },
  },
};
</script>
