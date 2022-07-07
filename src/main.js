import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import VeeValidate from 'vee-validate';
import i18n from "./helpers/i18n.js"

Vue.use(VeeValidate);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
}).$mount('#app')
