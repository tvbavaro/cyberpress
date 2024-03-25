<template>
    <component :is="icon"/>
</template>

<script>
import { ICONS } from '@icons';
import { isValidIcon } from '@helpers/validators';

export default {
    props: {
        name: {
            requare: true,
            default: null,
            type: String,
            validator: isValidIcon
        }
    },
    computed: {
        icon() {
            return ICONS[this.name];
        }
    },
}
</script>