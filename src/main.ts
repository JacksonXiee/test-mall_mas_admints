import { createApp } from 'vue'
import App from './App.vue'
import { globalRegister } from './global'
//router
import router from './router'

//pinia
import { createPinia } from 'pinia'
import setupStore from '@/store/setupStore'
//样式引入
import 'normalize.css'
import '@/assets/main.css'

// //全局element
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'


import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

setupStore()

app.use(router)
app.use(globalRegister)
app.use(ElementPlus, {
  locale: zhCn
})
app.mount('#app')
