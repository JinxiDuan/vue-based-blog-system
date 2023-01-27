import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import '/src/assets/fonts/font.css'
import 'element-plus/theme-chalk/dark/css-vars.css'


const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus)
app.use(mavonEditor)
app.mount('#app')
