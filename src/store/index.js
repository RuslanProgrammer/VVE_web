import Vue from 'vue';
import Vuex from 'vuex';

import i18n, {selectedLocale} from '../helpers/i18n';
import {auth} from './auth.module';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth
    },
    state: {
        locale: selectedLocale
    },
    getters: {
        getLocale: state => state.locale
    },
    mutations: {
        updateLocale(state, newLocale) {
            i18n.locale = newLocale // важно оставить, что б менялся язык
            state.locale = newLocale // а здесь меняем значение для переключателя
            localStorage.setItem('locale', newLocale); // запоминаем текущий язык, что б после перезагрузки страницы не сбросило на стандартный
        }
    },
});
