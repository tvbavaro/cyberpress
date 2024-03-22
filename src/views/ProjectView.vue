<template>
    <projectGrid :typePage="PAGE_PROJECT" :typePreview="PAGE_DONATE"/>
</template>
<script>
import projectGrid from '@components/project-grid.vue';
import { PAGE_PROJECT, PAGE_DONATE } from '../router/routes';
export default {
    data() {
        return {
            PAGE_PROJECT,
            PAGE_DONATE
        }
    },
    components: {
        projectGrid
    }
}
</script>