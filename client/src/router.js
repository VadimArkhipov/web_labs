import {createRouter, createWebHashHistory} from "vue-router"
import Login from "@/components/Login";
import Main from "@/components/Main";
import Purchase from "@/components/Purchase";
import Analysis from "@/components/Analysis";
import Sale from "@/components/Sale";
import Admin from "@/components/Admin";
import store from "@/store/store";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            redirect: "/auth/login"
        },
        {
            path: "/auth/login",
            component: Login
        },
        {
            path: "/user",
            redirect: "/user/analysis",
            component: Main,
            children: [
                {
                    path: "purchase",
                    meta: {auth: true},
                    component: Purchase
                },
                {
                    path: "sale",
                    meta: {auth: true},
                    component: Sale
                },
                {
                    path: "analysis",
                    meta: {auth: true},
                    component: Analysis
                },
                {
                    path: "admin",
                    meta: {auth: true},
                    component: Admin
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    const requireAuth = to.matched.some(path => path.meta.auth)
    if (requireAuth){
        if (store.getters.isLoggedIn){
            next()
        } else {
            next("/auth/login")
        }
    } else {
        if (store.getters.isLoggedIn) {
            next("/user")
        } else {
            next()
        }
    }
})

export default router