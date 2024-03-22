<template>
    <projectGrid :typePage="PAGE_DONATE" :typePreview="PAGE_TEAM"/>
</template>
<script>
import projectGrid from '@components/project-grid.vue';
import { PAGE_DONATE, PAGE_TEAM } from '../router/routes';
export default {
    data() {
        return {
            PAGE_DONATE,
            PAGE_TEAM
        }
    },
    components: {
        projectGrid
    }
}
</script>