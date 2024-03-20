<template>
    <component :is="icon"/>
</template>

<script>
import { ICONS } from '@icons';

export default {
    props: {
        name: {
            requare: true,
            default: null,
            type: String,
            validator: null
        }
    },
    computed: {
        icon() {
            return ICONS[this.name];
        }
    },
}
</script>