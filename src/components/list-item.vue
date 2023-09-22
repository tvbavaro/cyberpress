<template>
    <ul class="list__column" v-if="isDropDown">
        <li class="list__item list__item-header" @click="isOpen = !isOpen">
            <h3 class="list__header">{{ title }}</h3>
            <svg class="list__arrow" :class="{ 'list__arrow_close': !isOpen }" width="24" height="24" viewBox="0 0 24 24"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 15L12 9L18 15" stroke="#2A2A34" stroke-width="2" stroke-linecap="round" />
            </svg>
        </li>
        <div class="list__items-wrapper" v-show="isOpen">
            <li class="list__item" v-for="item in list" :key="item" @click="handleClick(item)"><span class="list__text">{{
                item
            }}</span></li>
        </div>
    </ul>
    <ul class="list__column" v-else>
        <li class="list__item list__item-header">
            <h3 class="list__header">{{ title }}</h3>
        </li>
        <div class="list__items-wrapper">
            <li class="list__item" v-for="item in list" :key="item" @click="handleClick(item)"><span class="list__text">{{
                item
            }}</span></li>
        </div>
    </ul>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
    data() {
        return {
            isOpen: false
        }
    },
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
        },
        isDropDown: {
            type: Boolean
        }
    },
    emits: {
        'close-all-modals': null
    },
    created() {
        if (this.title === 'News') {
            this.isOpen = true;
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
            this.$router.push({ name: pageName });
            //this.$router.afterEach(()=> {window.scrollTo({ top: 0, behavior: 'smooth' });});
        },
        handleClick(value) {
            this.$emit('close-all-modals');
            if (value === 'Contacts') {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            } else {
                switch (this.actionType) {
                    case 'tags':
                        this.setSearchTagVuex(value);
                        this.goToPage('main');
                        break;
                    case 'redirect':
                        this.goToPage(value.toLowerCase());
                        break;

                    default: console.log('no match');
                }
            }

        }
    }
}
</script>