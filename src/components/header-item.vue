<template>
    <div class="header">
        <div class="header__wrapper">
            <div class="header__grid">
                <div class="header__basic">
                    <div class="logo logo__wrapper" @click="handleClickHome">
                        <img class="logo__img" src="@assets/logo.png" alt="logo">
                        <span class="logo__name">InfoDefense</span>
                    </div>
                    <div class="header__actions-wrapper">
                        <div class="search header__search" :class="{ 'header__search_active': togglers.isSearchOpen }"
                            @click="openSearch">
                            <div class="search__wrapper">
                                <img v-if="!togglers.isSearchOpen" class="search__icon" src="@assets/24x24/search.svg"
                                    alt="">
                                <img v-else class="search__close" src="@assets/24x24/cross.svg">
                                <span class="search__text">Search</span>
                            </div>
                        </div>
                        <div class="filters header__filters">
                            <div class="filters__wrapper">
                                <img class="filters__icon" src="@assets/24x24/filter.svg" alt="">
                                <span class="filters__text">Filters</span>
                            </div>
                        </div>
                    </div>
                </div>
                <socialIcons class="header__social" />
                <div class="navigation header__navigation" :class="{ 'header__navigation_active': togglers.isMenuOpen }"
                    @click="openMenu">
                    <div class="navigation__wrapper">
                        <div class="burger header__burger-wrapper">
                            <span class="burger__line" :class="{ 'burger__line_active': togglers.isMenuOpen }"></span>
                        </div>
                        <span class="navigation__text">Menu</span>
                    </div>
                </div>
            </div>
            <div class="menu menu__wrapper" :class="{ 'menu__wrapper_active': togglers.isMenuOpen }">
                <nav class="menu__grid">
                    <listItem class="menu__list-wrapper" title="News" actionType="category"
                        :list="['Home', 'Today', 'This week/Last week', 'Nov/Oct/Sept/Aug/Jun/Jul', '2021/2022']"
                        :isDropDown="isMobile" />
                    <listItem class="menu__list-wrapper" @close-all-modals="closeAllModals" title="Popular tags"
                        actionType="tags" :list="popularTagsVuex" :isDropDown="isMobile" />
                    <listItem class="menu__list-wrapper" @close-all-modals="closeAllModals" title="About InfoDefence"
                        actionType="redirect" :list="['Project', 'Team', 'Donate', 'Contacts']" :isDropDown="isMobile" />

                    <ul class="menu__column" v-if="isMobile">
                        <li class="menu__item">
                            <socialIcons class="menu__social" />
                        </li>
                    </ul>
                    <ul class="menu__column" v-else>
                        <li class="menu__item"><span class="menu__header">Stay Connected</span></li>
                        <li class="menu__item">
                            <socialIcons class="menu__social" />
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="search-menu search-menu__wrapper" :class="{ 'search-menu__wrapper_active': togglers.isSearchOpen }">
                <div class="search-menu__input-wrapper">
                    <input class="search-menu__input" @input="setSearch" type="text" placeholder="Search"
                        :value="searchTermVuex" />
                    <img class="search-menu__icon" src="@assets/24x24/search.svg" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import socialIcons from '@components/social-icons.vue';
import listItem from '@components/list-item.vue';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
export default {
    data() {
        return {
            togglers: {
                isMenuOpen: false,
                isSearchOpen: false
            }
        }
    },
    created() {
        this.getPopularTagsVuex();
    },
    components: {
        socialIcons,
        listItem
    },
    computed: {
        ...mapState({
            searchTermVuex: 'searchTerm',
            popularTagsVuex: 'popularTags',
            deviceTypeVuex: 'deviceType',
            //deviceVuex: 'device',
            isMobile: 'isMobile'
        }),
        ...mapGetters({
            searchTermLengthVuex: 'searchTermLength'
        }),
    },
    methods: {
        ...mapMutations({
            setSearchTermVuex: 'setSearchTerm'
        }),
        ...mapActions({
            getPopularTagsVuex: 'getPopularTags'
        }),
        setSearch(e) {
            this.setSearchTermVuex(e.target.value);
            window.history.replaceState(null, document.title, `${window.location.pathname}?q=${e.target.value}`);
            console.log(window.history);
        },
        closeAllModals() {
            for (let key in this.togglers) {
                if (this.togglers[key]) {
                    this.togglers[key] = false;
                }
            }
        },
        openMenu() {
            if (!this.togglers.isMenuOpen) {
                this.closeAllModals();
                this.togglers.isMenuOpen = true;
            } else this.togglers.isMenuOpen = false;

        },
        openSearch() {
            if (!this.togglers.isSearchOpen) {
                this.closeAllModals();
                this.togglers.isSearchOpen = true;
            } else {
                //this.setSearchTermVuex('');
                this.togglers.isSearchOpen = false;
            }
        },
        handleClickHome() {
            this.$router.push({ name: 'main' });
        }
    },
    // watch: {
    //     searchTermLengthVuex(newValue, oldValue) {
    //         if (newValue > 2) {
    //             this.$router.push({ name: 'search' });
    //         } else this.$router.push({ name: 'main' });
    //     }
    // }
}
</script>