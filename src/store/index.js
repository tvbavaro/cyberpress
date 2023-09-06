import Vuex from 'vuex';

export const store = new Vuex.Store({
    state:{
        searchPhrase: ''
    },
    getters: {
        lengthSearchPhrase: state => {
            return state.searchPhrase.length;
        }
    },
    mutations: {
        updateSearchPhrase(state,searchPhraseByUser) {
            state.searchPhrase = searchPhraseByUser;
        }
    },
    actions:{}  
})