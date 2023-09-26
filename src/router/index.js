import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import store from '../store';

export const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

router.afterEach((to, from) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    store.commit('setPageURL');
});