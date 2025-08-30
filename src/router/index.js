import { createRouter, createWebHistory } from "vue-router";
import LoginComponent from "../views/LoginComponent.vue";
import DashboardComponent from "../views/DashboardComponent.vue";
const Overview = () => import("../views/dashboard/Overview.vue");
const Drugs = () => import("../views/dashboard/Drugs.vue");
const Vendors = () => import("../views/dashboard/Vendors.vue");
const SellingHistory = () => import("../views/dashboard/SellingHistory.vue");
const Settings = () => import("../views/dashboard/Settings.vue");

const routes = [
  { path: "/", component: LoginComponent },
  {
    path: "/dashboard",
    component: DashboardComponent,
    children: [
      { path: "overview", component: Overview },
      { path: "drugs", component: Drugs },
      { path: "vendors", component: Vendors },
      { path: "selling-history", component: SellingHistory },
      { path: "settings", component: Settings },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
