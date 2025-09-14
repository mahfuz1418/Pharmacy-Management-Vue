import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import router from "./router";
import "@fortawesome/vue-fontawesome";

const app = createApp(App);
app.use(router);

const pinia = createPinia();
app.use(pinia)

app.mount("#app");
