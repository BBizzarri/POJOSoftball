
import RegistrationsPage from "../views/RegistrationsPage.vue"
import AdminRegistrationsPage from "../views/AdminRegistrationsPage.vue"
import UnderConstruction from "../views/UnderConstruction.vue"
import LoginPage from "../views/LoginPage.vue"
import MoreInfo from "../components/MoreInfo"
import AdminSettings from "../views/AdminSettings.vue"
import HomePage from "../views/HomePage.vue"
import GalleryPage from "../views/GalleryPage.vue"
import CalendarPage from "../views/CalendarPage.vue"
import AboutUs from "../views/AboutUs.vue"
import { createRouter, createWebHistory } from "vue-router"

const routes = [
    {
        path: '/login',
        name: "LoginPage",
        component: LoginPage
    },
    {
        path: "/registrations",
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
    },
    {
        path: "/settings",
        name: "AdminSettings",
        component: AdminSettings
    },
    {
        path: "/",
        name: "HomePage",
        component: HomePage
    },
    {
        path: "/gallery",
        name: "GalleryPage",
        component: GalleryPage
    },
    {
        path: "/calendar",
        name: "CalendarPage",
        component: CalendarPage
    },
    {
        path: "/aboutus",
        name: "AboutUs",
        component: AboutUs
    }

]

// Create Vue Router Object
const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
      document.getElementById('app').scrollIntoView({behavior:'smooth'});
    }
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