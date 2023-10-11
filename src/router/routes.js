export const routes = [
    {
        path: '/cyberpress/',
        name: 'main',
        component: () => import('@views/MainView.vue'),
    },
    {
        path: '/cyberpress/paper/:id',
        name: 'paper',
        component: () => import('@views/PaperView.vue'),
        props: true
    },
    {
        path: '/cyberpress/project',
        name: 'project',
        component: () => import('@views/ProjectView.vue')
    },
    {
        path: '/cyberpress/donate',
        name: 'donate',
        component: () => import('@views/DonateView.vue')
    },
    {
        path: '/cyberpress/team',
        name: 'team',
        component: () => import('@views/TeamView.vue')
    }
]