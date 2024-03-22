<template>
  <div class="filters-applied">
    <div class="filters-applied__wrapper">
      <div class="filters-applied__wrapper-content">
        <h5 class="filters-applied__heading">Filters applied:</h5>
        <div class="filters-applied__content-wrapper">
          <span class="filters-applied__text" v-show="searchTag.length"
            >#{{ searchTag.join(" #") }}</span
          >
          <span class="filters-applied__text" v-show="searchTerm"
            >Keyword: {{ searchTerm }}</span
          >
          <span class="filters-applied__text" v-show="choosenCategory.length"
            >Category: {{ choosenCategory.join(" ") }}</span
          >
        </div>
      </div>
      <actionButton @click="resetFilters">Reset filters</actionButton>
    </div>
  </div>
</template>
<script>
import actionButton from "@components/action-button.vue";
export default {
  components: {
    actionButton,
  },
  props: {
    searchTerm: {
      type: String,
    },
    searchTag: {
      type: Array,
    },
    choosenCategory: {
      type: Array,
    },
  },
  emits: {
    "reset-filters": null,
  },
  methods: {
    resetFilters() {
      this.$emit("reset-filters");
    },
  },
};
</script>
