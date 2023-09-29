<template>
    <div class="header">
        <div class="header__wrapper">
            <div class="header__grid">
                <div class="header__basic">
                    <div class="logo logo__wrapper" @click="handleRedirect('main')">
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
                        <div class="filters header__filters" :class="{ 'header__filters_active': togglers.isFiltersOpen }"
                            @click="openFilters">
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
                <nav class="menu__grid">ß
                    <listItem class="menu__list-wrapper" title="News" :executableFunction="setCategory"
                        @click="closeAllModals" :list="['Home', 'Software', 'Business', 'Governmen', 'Entertainment']"
                        :isDropDown="isMobile" />

                    <listItem class="menu__list-wrapper" title="Popular tags" @click="closeAllModals"
                        :executableFunction="setTag" :list="popularTagsVuex.slice(0, 5)" :isDropDown="isMobile" />

                    <listItem class="menu__list-wrapper" title="About InfoDefence" @click="closeAllModals"
                        :executableFunction="handleRedirect" :list="['Project', 'Team', 'Donate', 'Contacts']"
                        :isDropDown="isMobile" />

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
                    <i class="search-menu__icon"></i>
                </div>
            </div>

            <div class="filters-menu filters-menu__wrapper"
                :class="{ 'filters-menu__wrapper_active': togglers.isFiltersOpen }">
                <div class="filters-menu__grid">
                    <listItem class="filters-menu__list-wrapper" :executableFunction="handleCategoryFilter"
                        @click="handleRedirect('main')" title="By categories"
                        :list="['Software', 'Business', 'Governmen', 'Entertainment']" :checkedList="choosenCategoryVuex"
                        :hasCheckbox="true" />

                    <listItem class="filters-menu__list-wrapper" :executableFunction="handleTagFilter"
                        @click="handleRedirect('main')" title="By popular tags" :list="popularTagsVuex.slice(0, 5)"
                        :checkedList="searchTagVuex" actionType="tags-filter" :hasCheckbox="true" />
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
                isSearchOpen: false,
                isFiltersOpen: false
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
            isMobile: 'isMobile',
            choosenCategoryVuex: 'choosenCategory',
            searchTagVuex: 'searchTag'
        }),
        ...mapGetters({
            searchTermLengthVuex: 'searchTermLength'
        }),
    },
    methods: {
        ...mapMutations({
            setSearchTermVuex: 'setSearchTerm',
            setSearchTagVuex: 'setSearchTag',
            setCategoryVuex: 'setCategory',
            setPageURLVuex: 'setPageURL',
            resetFiltersVuex: 'resetFilters',
            addCategoryFilterVuex: 'addCategoryFilter',
            removeCategoryFilterVuex: 'removeCategoryFilter',
            addTagFilterVuex: 'addTagFilter',
            removeTagFilterVuex: 'removeTagFilter'
        }),
        ...mapActions({
            getPopularTagsVuex: 'getPopularTags'
        }),
        setSearch(e) {
            const searchTerm = e.target.value;
            this.setSearchTermVuex(searchTerm);
            if (document.location.pathname !== '/') {
                this.$router.push({ name: 'main' });
            } else this.setPageURLVuex();
        },
        setCategory(categoryName) {
            if (categoryName === 'Home') {
                this.resetFiltersVuex();
                this.closeAllModals();
                this.handleRedirect('main');
            } else {
                this.setCategoryVuex(categoryName);
                this.handleRedirect('main');
            }
        },
        setTag(tagName) {
            this.setSearchTagVuex(tagName);
            this.handleRedirect('main');
        },
        closeAllModals() {
            for (let key in this.togglers) {
                if (this.togglers[key]) {
                    this.togglers[key] = false;
                }
            }
        },
        handleCategoryFilter(inputChecked, value) {
            if (inputChecked) {
                this.addCategoryFilterVuex(value);
            } else this.removeCategoryFilterVuex(value);
        },
        handleTagFilter(inputChecked, value) {
            if (inputChecked) {
                this.addTagFilterVuex(value);
            } else this.removeTagFilterVuex(value);
        },
        openMenu() {
            if (!this.togglers.isMenuOpen) {
                this.closeAllModals();
                this.togglers.isMenuOpen = true;
            } else this.togglers.isMenuOpen = false;
        },
        openFilters() {
            if (!this.togglers.isFiltersOpen) {
                this.closeAllModals();
                this.togglers.isFiltersOpen = true;
            } else this.togglers.isFiltersOpen = false;
        },
        openSearch() {
            if (!this.togglers.isSearchOpen) {
                this.closeAllModals();
                this.togglers.isSearchOpen = true;
            } else {
                this.togglers.isSearchOpen = false;
            }
        },
        handleRedirect(pageName) {
            if (pageName === 'Contacts') {
                this.showContacts();
            } else this.$router.push({ name: pageName.toLowerCase() });
        },
        showContacts() {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    },
}
</script>