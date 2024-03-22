<template>
    <projectGrid :typePage="PAGE_TEAM" :typePreview="PAGE_PROJECT"/>
</template>
<script>
import projectGrid from '@components/project-grid.vue';
import { PAGE_TEAM, PAGE_PROJECT } from '../router/routes';
export default {
    data() {
        return {
            PAGE_TEAM,
            PAGE_PROJECT
        }
    },
    components: {
        projectGrid
    }
}
</script>
