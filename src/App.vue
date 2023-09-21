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

export default {
  components: {
    headerItem,
    newsGrid,
    footerItem
  },
  created() {
    this.$store.commit('setDeviceType');
    window.addEventListener('resize', this.updateDeviceType);
  },
  beforeUnmount() {
    this.removeEventListener('resize', this.updateDeviceType);
  },
  methods: {
    updateDeviceType() {
      this.$store.commit('setDeviceType');
    }
  }
}
</script>


