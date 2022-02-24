import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import NutUI from "@nutui/nutui";
import "@nutui/nutui/dist/styles/themes/default.scss";
import novelRequest from './services/novelRequest';

const app = createApp(App)

//设置全局对象
app.config.globalProperties.$novelrequest = novelRequest 

app.use(router).use(NutUI).mount('#app')