export const routes = [
    {
        path: '',
        name: 'main',
        component: () => import('@views/MainView.vue'),
    },
    {
        path: '/paper/:id',
        name: 'paper',
        component: () => import('@views/PaperView.vue'),
        props: true
    },
    {
        path: '/project',
        name: 'project',
        component: () => import('@views/ProjectView.vue')
    },
    {
        path: '/donate',
        name: 'donate',
        component: () => import('@views/DonateView.vue')
    },
    {
        path: '/team',
        name: 'team',
        component: () => import('@views/TeamView.vue')
    }



]