<template>
    <div class="filters-applied">
        <div class="filters-applied__wrapper">
            <div class="filters-applied__wrapper-content">
                <h5 class="filters-applied__heading">Filters applied:</h5>
                <div class="filters-applied__content-wrapper">
                    <span class="filters-applied__text">{{ searchTagVuex }}</span>
                    <span class="filters-applied__text"> Keyword: {{ searchTermVuex }}</span>
                </div>
                
            </div>
            <actionButton @click="resetFilters">Reset filters</actionButton>
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
            searchTagVuex: 'searchTag',
            searchTermVuex: 'searchTerm'
        })
    },
    methods: {
        ...mapMutations({
            setSearchTagVuex: 'setSearchTag'
        }),
        resetFilters() {
            this.setSearchTagVuex('');
        }
    }
}
</script>