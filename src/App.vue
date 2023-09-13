<template>
  <header>
    <headerItem/>
  </header>
  <main class="container-content">
    <RouterView/>
  </main>
  <footer>
    <footerItem/>
  </footer>
</template>

<script>
//import { RouterView } from 'vue-router';
import headerItem from '@components/header-item.vue';
import newsGrid from '@components/news-grid.vue';
import footerItem from '@components/footer-item.vue';

export default {
  components: {
    headerItem,
    newsGrid,
    footerItem
  }
}
</script>


