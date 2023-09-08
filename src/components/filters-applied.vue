<template>
    <div class="filters-applied">
        <div class="filters-applied__wrapper">
            <div class="filters-applied__wrapper-content">
                <h5 class="filters-applied__heading">Filters applied:</h5>
                <span class="filters-applied__text">{{ searchTagVuex }}</span>
            </div>
            <actionButton @click="resetTag">Reset filters</actionButton>
        </div>
    </div>
</template>
<script>
import actionButton from '@components/action-button.vue';
import { mapState, mapMutations } from 'vuex';
export default {
    components: {
        actionButton
    },
    computed: {
        ...mapState({
            searchTagVuex: 'searchTag'
        })
    },
    methods: {
        ...mapMutations({
            setSearchTagVuex: 'setSearchTag'
        }),
        resetTag() {
            this.setSearchTagVuex('');
        }
    }
}
</script>