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
        },
        setSearchTag(state, searchTagByUserSelect) {
            state.searchTag = searchTagByUserSelect;
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
})