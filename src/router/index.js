import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import store from '../store';

export const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

router.afterEach((to, from) => {
    // if(to.fullPath !== from.fullPath) {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },100);
        store.commit('setPageURL');
    // } else console.log('false');
});