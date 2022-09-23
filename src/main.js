import { createApp } from 'vue'
import App from './App.vue'
import getVant from './plugins'
import router from './router'
import store from './store'


const app = createApp(App)
getVant(app)
app.use(store);
app.use(router).mount('#app')
