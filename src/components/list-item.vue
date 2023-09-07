<template>
    <ul class="list__column">
        <li class="list__item">
            <h3 class="list__header">{{ title }}</h3>
        </li>
        <li class="list__item" v-for="item in list" :key="item" @click="handleClick(item)"><span class="list__text">{{ item
        }}</span></li>
    </ul>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
    props: {
        title: {
            type: String
        },
        list: {
            type: Array
        },
        actionType: {
            type: String,
            requared: true
        }
    },
    computed: {
        ...mapState({
            searchTermVuex: 'searchTerm'
        })
    },
    methods: {
        ...mapMutations({
            setSearchTagVuex: 'setSearchTag'
        }),
        goToPage(pageName) {
            this.$router.push({ name: pageName })
        },
        handleClick(value) {
            switch (this.actionType) {
                case 'tags': this.setSearchTagVuex(value.split(/\#/).join(''));
                    break;
                case 'redirect': this.goToPage(value.toLowerCase());
                    break;

                default: console.log('no match');
            }
        }
    }
}
</script>