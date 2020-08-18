import {
  mixinDialogMutations,
  mixinDialogActions,
  mixinDialogGetters
} from '../../mixins/vuex_dialogs';

export default {
  namespaced: true,
  state: {
    rows: [],
    devHash: '',
    loading: false,
    dialogs: {
      logSidebar: false,
    }
  },
  getters: {
    ...mixinDialogGetters,

    rows: state => state.rows,
    devHash: state => state.devHash,
    loading: state => state.loading
  },
  mutations: {
    ...mixinDialogMutations,

    SET_ROWS: (state, rows) => {
      state.rows = rows;
    },

    SET_DEV_HASH: (state, payload) => {
      state.devHash = payload;
    },

    SET_LOADING: (state, payload) => {
      state.loading = payload;
    }
  },
  actions: {
    ...mixinDialogActions,
    
    async loadLog({commit}, payload) {
      commit('SET_LOADING', true);
      const response = await this._vm.api.post('/fb_api_log', {objects: payload});
      if (typeof response.data.data !== 'undefined') {
        console.log(JSON.stringify(response.data.data));
        
        commit('SET_ROWS', response.data.data.rows);
        commit('SET_DEV_HASH', response.data.data.dev_hash);
      }
      commit('SET_LOADING', false);
    },

    async clearLog({commit}) {
      commit('SET_ROWS', []);
      commit('SET_DEV_HASH', '');
    }
  }
};