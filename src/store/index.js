import Vuex from 'vuex';
import { getPopularTags as getPopularTagsAPI } from '@api/api.js';

export const store = new Vuex.Store({
    state: {
        searchTerm: '',
        searchTag: '',
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
            //this.commit('setPageURL');
        },
        setPageURL(state) {
            const params = {
                searchFilter: state.searchTerm.length ? `q=${state.searchTerm}` : '',
                tagFilter: state.searchTag.length ? `tag=${state.searchTag}` : ''
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
            window.history.pushState(historyState, pageTitle, pageURL);

        },
        setSearchTag(state, searchTagByUserSelect) {
            state.searchTag = searchTagByUserSelect.replace(/\#/, '');
            //this.commit('setPageURL');
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
        }
    },
    actions: {
        async getPopularTags({ commit }) {
            await getPopularTagsAPI().then(tags => commit('setPopularTags', tags));
        }
    }
});

export default store;