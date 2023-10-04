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
                <nav class="menu__grid">
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

                    <dropFilter :list="popularTagsVuex" :checkedList="searchTagVuex"
                        :executableFunction="handleTagFilter" />
                    <div class="filters-menu__actions">
                        <div class="filters-menu__actions-wrapper">
                            <svg class="filters-menu__clear-filters" @click="resetFiltersVuex" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M4.5092 2.66663C2.30151 2.66663 1.03551 5.19467 2.38786 6.95501L2.38786 6.95501L2.39044 6.95835L8.50004 14.8421V20.3333C8.50004 20.6701 8.66957 20.9843 8.95108 21.1691C9.23259 21.354 9.58826 21.3848 9.89733 21.251L12.0001 20.3406V18.1613L10.5 18.8107V14.5C10.5 14.2782 10.4263 14.0627 10.2905 13.8874L3.97387 5.73658L3.97287 5.73527C3.64184 5.30229 3.94579 4.66663 4.5092 4.66663H19.49C20.0526 4.66663 20.3581 5.3019 20.027 5.7364L20.0257 5.73808L19.8227 6H22.0846C22.5022 4.40316 21.3203 2.66663 19.49 2.66663H4.5092Z"
                                    fill="#2A2A34" />
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M20.0072 8.29289C20.3977 7.90237 21.0309 7.90237 21.4214 8.29289C21.8119 8.68342 21.8119 9.31658 21.4214 9.70711L19.2714 11.8571L21.4214 14.0072C21.8119 14.3977 21.8119 15.0309 21.4214 15.4214C21.0309 15.8119 20.3977 15.8119 20.0072 15.4214L17.8571 13.2714L15.7071 15.4214C15.3166 15.8119 14.6834 15.8119 14.2929 15.4214C13.9024 15.0309 13.9024 14.3977 14.2929 14.0072L16.4429 11.8571L14.2929 9.70711C13.9024 9.31658 13.9024 8.68342 14.2929 8.29289C14.6834 7.90237 15.3166 7.90237 15.7071 8.29289L17.8571 10.4429L20.0072 8.29289Z"
                                    fill="#2A2A34" />
                            </svg>
                            <actionButton class="filters-menu__cancel-btn" @click="resetFiltersVuex(); closeAllModals()">Cancel</actionButton>
                            <actionButton class="filters-menu__search-btn" @click="closeAllModals">Search</actionButton>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import socialIcons from '@components/social-icons.vue';
import listItem from '@components/list-item.vue';
import dropFilter from '@components/drop-filter.vue';
import actionButton from '@components/action-button.vue';
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
        listItem,
        dropFilter,
        actionButton
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
                //this.handleRedirect('main');
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