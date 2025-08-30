import { createRouter, createWebHistory } from "vue-router";
import LoginComponent from "../views/LoginComponent.vue";
import DashboardComponent from "../views/DashboardComponent.vue";


const routes = [
    {path: "/", component: LoginComponent},
    {path: "/dashboard", component: DashboardComponent}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;