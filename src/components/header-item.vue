<template>
  <div class="header">
    <div class="header__wrapper">
      <div class="header__grid">
        <div class="header__basic">
          <logoItem />
          <div class="header__actions-wrapper">
            <button
              class="search header__search"
              :class="{ header__search_active: togglers.isSearchOpen }"
              @click="openSearch"
              tabindex="0"
            >
              <div class="search__wrapper">
                <baseIcon
                  v-if="!togglers.isSearchOpen"
                  class="search__icon"
                  :name="ICON_SEARCH"
                />
                <baseIcon v-else class="search__close" :name="ICON_CROSS" />
                <span class="search__text">Search</span>
              </div>
            </button>
            <button
              class="filters header__filters"
              :class="{ header__filters_active: togglers.isFiltersOpen }"
              @click="openFilters"
              tabindex="0"
            >
              <div class="filters__wrapper">
                <baseIcon
                  v-if="!togglers.isFiltersOpen"
                  class="search__icon"
                  :name="ICON_FILTER"
                />
                <baseIcon v-else class="search__close" :name="ICON_CROSS" />
                <span class="filters__text">Filters</span>
              </div>
            </button>
          </div>
        </div>
        <socialIcons class="header__social" />
        <button
          class="navigation header__navigation"
          :class="{ header__navigation_active: togglers.isMenuOpen }"
          @click="openMenu"
          tabindex="0"
        >
          <div class="navigation__wrapper">
            <div class="burger header__burger-wrapper">
              <span
                class="burger__line"
                :class="{ burger__line_active: togglers.isMenuOpen }"
              ></span>
            </div>
            <span class="navigation__text">Menu</span>
          </div>
        </button>
      </div>
      <div
        class="menu menu__wrapper"
        :class="{ menu__wrapper_active: togglers.isMenuOpen }"
      >
        <nav class="menu__grid">
          <listItem
            class="menu__list-wrapper"
            title="News"
            :executableFunction="setCategory"
            @click="closeAllModals"
            :list="[
              'Home',
              'Software',
              'Business',
              'Governmen',
              'Entertainment',
            ]"
            :isDropDown="isMobile"
          />

          <listItem
            class="menu__list-wrapper"
            title="Popular tags"
            @click="closeAllModals"
            :executableFunction="setTag"
            :list="popularTagsVuex.slice(0, 5)"
            :isDropDown="isMobile"
          />

          <listItem
            class="menu__list-wrapper"
            title="About CyberPress"
            @click="closeAllModals"
            :executableFunction="handleRedirect"
            :list="['Project', 'Team', 'Donate', 'Contacts']"
            :isDropDown="isMobile"
          />

          <ul class="menu__column" v-if="isMobile">
            <li class="menu__item">
              <socialIcons class="menu__social" />
            </li>
          </ul>
          <ul class="menu__column" v-else>
            <li class="menu__item">
              <span class="menu__header">Stay Connected</span>
            </li>
            <li class="menu__item">
              <socialIcons class="menu__social" />
            </li>
          </ul>
        </nav>
      </div>
      <div
        class="search-menu search-menu__wrapper"
        :class="{ 'search-menu__wrapper_active': togglers.isSearchOpen }"
      >
        <div class="search-menu__input-wrapper">
          <input
            class="search-menu__input"
            @input="setSearch"
            type="text"
            placeholder="Search"
            :value="searchTermVuex"
            ref="searchInput"
          />
          <baseIcon class="search-menu__icon" :name="ICON_SEARCH" />
        </div>
      </div>

      <div
        class="filters-menu filters-menu__wrapper"
        :class="{ 'filters-menu__wrapper_active': togglers.isFiltersOpen }"
      >
        <div class="filters-menu__grid">
          <listItem
            class="filters-menu__list-wrapper"
            :executableFunction="handleCategoryFilter"
            title="By categories"
            :list="['Software', 'Business', 'Governmen', 'Entertainment']"
            :checkedList="choosenCategoryVuex"
            :hasCheckbox="true"
            :isDropDown="isMobile"
          />

          <listItem
            class="filters-menu__list-wrapper"
            :executableFunction="handleTagFilter"
            title="By popular tags"
            :list="popularTagsVuex.slice(0, 5)"
            :checkedList="searchTagVuex"
            :hasCheckbox="true"
            :isDropDown="isMobile"
          />

          <dropFilter
            class="filters-menu__list-wrapper"
            :list="popularTagsVuex"
            :checkedList="searchTagVuex"
            :executableFunction="handleTagFilter"
          />
          <div class="filters-menu__actions filters-menu__list-wrapper">
            <div class="filters-menu__actions-wrapper">
              <button
                class="filters-menu__clear-filters"
                @click="
                  resetFiltersVuex();
                  setPageURLVuex();
                "
              >
                <baseIcon :name="ICON_RESET_FILTERS" />
              </button>
              <div class="filters-menu__btns-wrapper">
                <actionButton
                  class="filters-menu__cancel-btn"
                  @click="
                    resetFiltersVuex();
                    closeAllModals();
                    setPageURLVuex();
                  "
                  >Cancel</actionButton
                >
                <actionButton
                  class="filters-menu__search-btn"
                  @click="closeAllModals(), handleRedirect(PAGE_HOME)"
                  >Search</actionButton
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import socialIcons from "@components/social-icons.vue";
import listItem from "@components/list-item.vue";
import dropFilter from "@components/drop-filter.vue";
import actionButton from "@components/action-button.vue";
import logoItem from "@components/logo-item.vue";
import baseIcon from "@components/base-icon.vue";
import { debounce, handleRedirect } from "@helpers/helpers";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { PAGE_HOME } from "@router/routes";
import {
  ICON_FILTER,
  ICON_RESET_FILTERS,
  ICON_SEARCH,
  ICON_CROSS,
} from "@icons";

export default {
  data() {
    return {
      ICON_SEARCH,
      ICON_FILTER,
      ICON_RESET_FILTERS,
      ICON_CROSS,
      PAGE_HOME,
      togglers: {
        isMenuOpen: false,
        isSearchOpen: false,
        isFiltersOpen: false,
      },
    };
  },
  created() {
    this.getPopularTagsVuex();
  },
  components: {
    socialIcons,
    listItem,
    dropFilter,
    actionButton,
    logoItem,
    baseIcon,
  },
  computed: {
    ...mapState({
      searchTermVuex: "searchTerm",
      popularTagsVuex: "popularTags",
      deviceTypeVuex: "deviceType",
      isMobile: "isMobile",
      choosenCategoryVuex: "choosenCategory",
      searchTagVuex: "searchTag",
    }),
    ...mapGetters({
      searchTermLengthVuex: "searchTermLength",
    }),
  },
  methods: {
    ...mapMutations({
      setSearchTagVuex: "setSearchTag",
      setCategoryVuex: "setCategory",
      setPageURLVuex: "setPageURL",
      resetFiltersVuex: "resetFilters",
      addCategoryFilterVuex: "addCategoryFilter",
      removeCategoryFilterVuex: "removeCategoryFilter",
      addTagFilterVuex: "addTagFilter",
      removeTagFilterVuex: "removeTagFilter",
    }),
    ...mapActions({
      getPopularTagsVuex: "getPopularTags",
      setQueryVuex: "setQuery",
    }),
    handleRedirect,
    closeAllModals() {
      for (let key in this.togglers) {
        if (this.togglers[key]) {
          this.togglers[key] = false;
        }
      }
    },
    setSearch(e) {
      const delay = 500;
      const searchTerm = e.target.value;
      const debounced = debounce(this.setQueryVuex, delay, this);
      debounced(searchTerm);
      if (document.location.pathname !== "/") {
        this.$router.push({ name: PAGE_HOME });
      }
    },
    setCategory(categoryName) {
      if (categoryName === "Home") {
        this.resetFiltersVuex();
        this.closeAllModals();
        this.handleRedirect(PAGE_HOME);
      } else {
        this.setCategoryVuex(categoryName);
        this.handleRedirect(PAGE_HOME);
      }
    },
    setTag(tagName) {
      this.setSearchTagVuex(tagName);
      this.handleRedirect(PAGE_HOME);
    },
    handleCategoryFilter(inputChecked, value) {
      if (inputChecked) {
        this.addCategoryFilterVuex(value);
        this.handleRedirect(PAGE_HOME);
      } else this.removeCategoryFilterVuex(value);
    },
    handleTagFilter(inputChecked, value) {
      if (inputChecked) {
        this.addTagFilterVuex(value);
        this.handleRedirect(PAGE_HOME);
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
        setTimeout(() => {
          this.$refs.searchInput.focus();
        }, 100);
      } else {
        this.togglers.isSearchOpen = false;
      }
    },
  },
};
</script>
