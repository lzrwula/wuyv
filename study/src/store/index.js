import Vue from 'vue';
import Vuex from 'vuex';
import Login from './login/index';
import Music from './music/index';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';
export default new Vuex.Store({
  strict: debug,
  modules: {
    Login,
	Music
  },
});
