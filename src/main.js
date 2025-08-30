import { createApp } from "vue";
import mitt from "mitt";
import "./style.css";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import router from "./router";
import "@fortawesome/vue-fontawesome";

let eventBus = mitt();
const app = createApp(App);
app.use(router);
app.config.globalProperties.$eventBus = eventBus;

app.mount("#app");
