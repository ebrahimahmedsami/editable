import VueRouter from 'vue-router'
import Vue from 'vue';

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import("../components/home/home.vue"),
        meta: {
            requireAuth: true,
        }
    },
    {
        path: "/users",
        name: "users",
        component: () => import("../components/users/users-list.vue"),
        meta: {
            requireAuth: true,
        }
    },
    {
        path: "/users-two",
        name: "users-two",
        component: () => import("../components/users/users-list-two.vue"),
        meta: {
            requireAuth: true,
        }
    }
];

const router = new VueRouter({
    routes,
    mode:'history'
});
Vue.use(VueRouter)

export default router;
