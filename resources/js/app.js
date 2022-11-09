//bootstrap
import App from "./components/app";

require('./bootstrap');
import lodash from "lodash";
window._ = lodash
import * as Popper from '@popperjs/core'
window.Popper = Popper


//axios
import axios from 'axios'
window.axios = axios
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';


//router
import router from "./components/router.js";




//app setting
import Application from './components/app.vue';

import Vue from 'vue';
Vue.component('app',Application)

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/en";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI, { locale });
Vue.use(ElementUI);

var app = new Vue({
    router,
}).$mount('#app')


