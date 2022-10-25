
import RegistrationsPage from "../views/RegistrationsPage.vue"
import UnderConstruction from "../views/UnderConstruction.vue"
import LoginPage from "../components/LoginPage.vue"
import { createRouter, createWebHistory } from "vue-router"

const routes = [
    {
        path: '/login',
        name: "LoginPage",
        component: LoginPage
    },
    {
        path: "/registration",
        name: "Registration",
        component: RegistrationsPage
    },
    {
        path: "/",
        name: "UnderConstruction",
        component: UnderConstruction
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