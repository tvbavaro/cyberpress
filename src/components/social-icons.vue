<template>
  <div class="social">
    <a href="#"><baseIcon :name="ICON_TWITTER" /></a>
    <a href="#"><baseIcon :name="ICON_TELEGRAM" /></a>
    <a href="#"><baseIcon :name="ICON_YOUTUBE" /></a>
  </div>
</template>

<script>
import { ICON_TWITTER, ICON_TELEGRAM, ICON_YOUTUBE } from "@icons";
import baseIcon from "@components/base-icon.vue";

export default {
  data() {
    return {
      ICON_TWITTER,
      ICON_TELEGRAM,
      ICON_YOUTUBE
    };
  },
  components: {
    baseIcon
  }
};
</script>
