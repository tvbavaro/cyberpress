import Vuex from 'vuex';
import { getPopularTags as getPopularTagsAPI } from '@api/api.js';

export const store = new Vuex.Store({
    state: {
        searchTerm: '',
        searchTag: '',
        choosenCategory: '',
        popularTags: [],
        deviceType: '',
        isTablet: false,
        isMobile: false
    },
    getters: {
        searchTermLength: state => {
            return state.searchTerm.length;
        }
    },
    mutations: {
        setSearchTerm(state, searchTermByUser) {
            state.searchTerm = searchTermByUser;
        },
        setPageURL(state) {
            const params = {
                searchFilter: state.searchTerm.length ? `q=${state.searchTerm}` : '',
                tagFilter: state.searchTag.length ? `tag=${state.searchTag}` : '',
                categoryFilter: state.choosenCategory.length ? `category=${state.choosenCategory}` : ''
            }
            const hasValueParams = Object.values(params).filter(el => el.length);

            let pageURL = document.location.pathname;
            if (hasValueParams.length > 1) {
                pageURL += `?${hasValueParams.join('&')}`;
            } else if (hasValueParams.length === 1) {
                pageURL += `?${hasValueParams[0]}`;
            }

            const historyState = window.history.state,
                pageTitle = document.title;
            window.history.replaceState(historyState, pageTitle, pageURL);
        },
        setSearchTag(state, searchTagByUserSelect) {
            state.searchTag = searchTagByUserSelect.replace(/\#/, '');
        },
        setCategory(state, choosenCategoryByUser) {
            state.choosenCategory = choosenCategoryByUser;
        },
        setPopularTags(state, tags) {
            state.popularTags = tags;
        },
        setDeviceType(state) {
            state.isTablet = false;
            state.isMobile = false;
            const currentWidth = window.innerWidth;
            switch (true) {
                case currentWidth > 1279:
                    state.deviceType = 'desktop';
                    break;
                case currentWidth > 767 && currentWidth <= 1279:
                    state.deviceType = 'tablet';
                    state.isTablet = true;
                    break;
                default:
                    state.deviceType = 'mobile';
                    state.isMobile = true;
            }
        },
        resetFilters(state) {
            state.searchTerm = '';
            state.searchTag = '';
            state.choosenCategory = '';
        }
    },
    actions: {
        async getPopularTags({ commit }) {
            await getPopularTagsAPI().then(tags => commit('setPopularTags', tags));
        }
    }
});

export default store;