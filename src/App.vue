<template>
  <header>
    <headerItem/>
  </header>
  <main>
    <newsGrid/>
  </main>
  <footer></footer>
</template>

<script>
//import { RouterView } from 'vue-router';
import headerItem from '@components/header-item.vue';
import newsGrid from '@components/news-grid.vue';

export default {
  components: {
    headerItem,
    newsGrid
  }
}
</script>


