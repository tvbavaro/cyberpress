export const PAGE_HOME = 'main';
export const PAGE_PAPER = 'paper';
export const PAGE_PROJECT = 'project';
export const PAGE_DONATE = 'donate';
export const PAGE_TEAM = 'team';

export const PAGE_NAMES = [
    PAGE_HOME,
    PAGE_PAPER,
    PAGE_PROJECT,
    PAGE_DONATE,
    PAGE_TEAM
]

export const routes = [
    {
        path: '/cyberpress/',
        name: PAGE_HOME,
        component: () => import('@views/MainView.vue'),
    },
    {
        path: '/cyberpress/paper/:id',
        name: PAGE_PAPER,
        component: () => import('@views/PaperView.vue'),
        props: true
    },
    {
        path: '/cyberpress/project',
        name: PAGE_PROJECT,
        component: () => import('@views/ProjectView.vue')
    },
    {
        path: '/cyberpress/donate',
        name: PAGE_DONATE,
        component: () => import('@views/DonateView.vue')
    },
    {
        path: '/cyberpress/team',
        name: PAGE_TEAM,
        component: () => import('@views/TeamView.vue')
    }
]