import { createApp } from 'vue'
import mitt from 'mitt'
import './style.css'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App);

let eventBus = mitt()
app.config.globalProperties.$eventBus = eventBus

app.mount('#app')
