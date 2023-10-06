import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import store from '../store';

export const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

router.beforeEach((to,from) => {
   // console.log('before',to,from);
});

router.afterEach((to, from) => {
    if(to.fullPath !== from.fullPath) {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },200);
    }
        store.commit('setPageURL');
});