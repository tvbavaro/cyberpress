import Vuex from 'vuex';
import { getPopularTags as getPopularTagsAPI } from '@api/api.js';

export const store = new Vuex.Store({
    state: {
        searchTerm: '',
        searchTag: '',
        popularTags: [],
        deviceType: ''
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
            const currentWidth = window.innerWidth;
            if(currentWidth > 1279) {
                state.deviceType = 'desktop';
            } else if (currentWidth > 767 && currentWidth <= 1279) {
                state.deviceType = 'tablet';
            } else state.deviceType = 'mobile';
        }
    },
    actions: {
        async getPopularTags({ commit }) {
            await getPopularTagsAPI().then(tags => commit('setPopularTags', tags));
        }
    }
})