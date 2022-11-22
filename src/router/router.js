
import RegistrationsPage from "../views/RegistrationsPage.vue"
import AdminRegistrationsPage from "../views/AdminRegistrationsPage.vue"
import UnderConstruction from "../views/UnderConstruction.vue"
import LoginPage from "../views/LoginPage.vue"
import MoreInfo from "../components/MoreInfo"
import { createRouter, createWebHistory } from "vue-router"

const routes = [
    {
        path: '/login',
        name: "LoginPage",
        component: LoginPage
    },
    {
        path: "/",
        name: "Registration",
        component: RegistrationsPage
    },
    {
        path: "/adminregistration",
        name: "AdminRegistration",
        component: AdminRegistrationsPage
    },
    {
        path: "/underConstruction",
        name: "UnderConstruction",
        component: UnderConstruction
    },
    {
        path: "/moreinfo",
        name: "MoreInfo",
        component: MoreInfo
    }
]

// Create Vue Router Object
const router = createRouter({
    history: createWebHistory(),
    routes,
})
  
export default router

// import Router from 'vue-router'
// import LoginPage from '../components/LoginPage.vue'


// export default new Router({
//     routes: [
//         {
//             path: '/login',
//             name: 'login-page',
//             component: LoginPage

//         }
//     ]
// })