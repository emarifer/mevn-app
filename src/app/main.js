import './bootstrap/css/bootstrap.min.css';
import './bootstrap/js/bootstrap.min.js';
import './assets/img/favicon.png';
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(VueAxios, axios);

// We add the base URL of our API
axios.defaults.baseURL = 'http://localhost:3000/api';

new Vue(Vue.util.extend({ router, store }, App)).$mount('#app');
