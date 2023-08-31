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
    }



]