<template>
  <div class="logo logo__wrapper" @click="handleRedirect('main')" tabindex="0">
    <baseIcon class="logo__icon" :name="ICON_LOGO" />
    <span class="logo__name">CyberPress</span>
  </div>
</template>

<script>
import baseIcon from "@components/base-icon.vue";
import { handleRedirect } from '../helpers/helpers';
import { ICON_LOGO } from '@icons';

export default {
    data() {
        return {
            ICON_LOGO
        }
    },
    components: {
        baseIcon
    },
    methods: {
        handleRedirect
    }
}
</script>