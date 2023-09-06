<template>
    <div class="header container">
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
                    <listItem class="menu__list-wrapper" title="News"
                        :list="['Home', 'Today', 'This week/Last week', 'Nov/Oct/Sept/Aug/Jun/Jul', '2021/2022']" />
                    <!-- <ul class="menu__column">
                        <li class="menu__item"><span class="menu__header">News</span></li>
                        <li class="menu__item"><span class="menu__text">Home</span></li>
                        <li class="menu__item"><span class="menu__text">Today</span></li>
                        <li class="menu__item"><span class="menu__text">This week/Last week</span></li>
                        <li class="menu__item"><span class="menu__text">Nov/Oct/Sept/Aug/Jun/Jul</span></li>
                        <li class="menu__item"><span class="menu__text">2021/2022</span></li>
                    </ul> -->
                    <ul class="menu__column">
                        <li class="menu__item"><span class="menu__header">Popular tags</span></li>
                        <li class="menu__item"><span class="menu__text">#Kherson</span></li>
                        <li class="menu__item"><span class="menu__text">#Evacuation</span></li>
                        <li class="menu__item"><span class="menu__text">#war_in_Ukraine</span></li>
                        <li class="menu__item"><span class="menu__text">#Russian_troops</span></li>
                        <li class="menu__item"><span class="menu__text">#Genocide2014History</span></li>
                    </ul>
                    <ul class="menu__column">
                        <li class="menu__item"><span class="menu__header">About InfoDefence</span></li>
                        <li class="menu__item"><span class="menu__text">Project</span></li>
                        <li class="menu__item"><span class="menu__text">Team</span></li>
                        <li class="menu__item"><span class="menu__text">Donate</span></li>
                        <li class="menu__item"><span class="menu__text">Contacts</span></li>
                    </ul>
                    <ul class="menu__column">
                        <li class="menu__item"><span class="menu__header">Stay Connected</span></li>
                    </ul>
                </nav>
            </div>
            <div class="search-menu search-menu__wrapper" :class="{ 'search-menu__wrapper_active': togglers.isSearchOpen }">
                <div class="search-menu__input-wrapper">
                    <input class="search-menu__input" @input="search" type="text" placeholder="Search"
                        :value="searchPhrase" />
                    <img class="search-menu__icon" src="@assets/24x24/search.svg" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import socialIcons from '@components/social-icons.vue';
import listItem from '@components/list-item.vue';
import { mapState, mapGetters, mapMutations } from 'vuex';
export default {
    data() {
        return {
            togglers: {
                isMenuOpen: false,
                isSearchOpen: false
            }
        }
    },
    components: {
        socialIcons,
        listItem
    },
    computed: {
        ...mapState(['searchPhrase']),
        ...mapGetters({
            lengthSearchPhraseVuex: 'lengthSearchPhrase'
        }),
    },
    methods: {
        ...mapMutations({
            updateSearchPhraseVuex: 'updateSearchPhrase'
        }),
        search(e) {
            this.updateSearchPhraseVuex(e.target.value);
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
            } else this.togglers.isSearchOpen = false;
        },
        handleClickHome() {
            this.$router.push({ name: 'main' });
        }
    },
    watch: {
        lengthSearchPhraseVuex(newValue, oldValue) {
            if (newValue > 2) {
                this.$router.push({ name: 'search' });
            } else this.$router.push({ name: 'main' });
        }
    }
}
</script>