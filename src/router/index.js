import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';

export const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

router.afterEach(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); });