<template>
  <header>
    <headerItem />
  </header>
  <main class="container-content">
    <RouterView />
  </main>
  <footer>
    <footerItem />
  </footer>
</template>

<script>
import headerItem from '@components/header-item.vue';
import newsGrid from '@components/news-grid.vue';
import footerItem from '@components/footer-item.vue';
import { mapMutations } from 'vuex';

export default {
  components: {
    headerItem,
    newsGrid,
    footerItem
  },

  created() {
    this.setDeviceTypeVuex();
    window.addEventListener('resize', this.setDeviceTypeVuex);

    const searchParams = Object.fromEntries(new URL(window.location).searchParams.entries());
    if (searchParams.q) {
      this.setSearchTermVuex(searchParams.q);
    }
    if (searchParams.tag) {
      this.setSearchTagVuex(searchParams.tag);
    }
  },

  beforeUnmount() {
    this.removeEventListener('resize', this.setDeviceTypeVuex);
  },

  methods: {
    ...mapMutations({
      setDeviceTypeVuex: 'setDeviceType',
      setSearchTermVuex: 'setSearchTerm',
      setSearchTagVuex: 'setSearchTag'
    })
  }
}
</script>


