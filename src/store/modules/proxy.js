import {
  mixinDialogMutations,
  mixinDialogActions,
  mixinDialogGetters
} from '../../mixins/vuex_dialogs';
import {
  mixinSetLoading
} from '../../mixins/vuex_loading';

export default {
  namespaced: true,
  
  state: {
    proxy: {
      all: [],
      filtered: [],
      selected: [],
      forPermissions: {},
      forEdit: {},
    },
    filters: {
      name: '',
    },
    dialogs: {
      share: false,
      check: false,
      delete: false,
      add: false,
      permissions: false,
      edit: false,
    },
    loading: {
      mainTable: false,
      share: false,
      add: false,
    }
  },

  getters: {
    ...mixinDialogGetters,

    proxy: state => state.proxy,
    filters: state => state.filters,
    loading: state => state.loading,
    selected: state => state.proxy.selected,
    forPermissions: state => state.proxy.forPermissions,
    forEdit: state => state.proxy.forEdit
  },
  mutations: {
    ...mixinDialogMutations,
    
    ...mixinSetLoading,

    SET_PROXY: (state, proxy) => {
      state.proxy.all = proxy;
    },

    FILTER_PROXY: state => {
      let proxy = state.proxy.all;

      if (state.filters.name && state.filters.name.toString().length > 0) {
        proxy = proxy.filter(p => {
          if (p.name && p.name.toString().toLowerCase().search(state.filters.name.toString().toLowerCase()) > -1) return true;
          if (p.ip && p.ip.toString().toLowerCase().search(state.filters.name.toString().toLowerCase()) > -1) return true;
          if (p.port && p.port.toString().toLowerCase().search(state.filters.name.toString().toLowerCase()) > -1) return true;
          if (p.login && p.login.toString().toLowerCase().search(state.filters.name.toString().toLowerCase()) > -1) return true;
          if (p.password && p.password.toString().toLowerCase().search(state.filters.name.toString().toLowerCase()) > -1) return true;
          if (p.external_ip && p.external_ip.toString().toLowerCase().search(state.filters.name.toString().toLowerCase()) > -1) return true;

          return false;
        });
      }

      state.proxy.filtered = proxy;
    },

    SET_SELECTED: (state, payload) => {
      state.proxy.selected = payload;
    },

    SET_FILTER: (state, payload) => {
      state.filters[payload.filter] = payload.data;
    },
    
    SET_FOR_PERMISSIONS: (state, payload) => {
      state.proxy.forPermissions = payload;
    },

    SET_FOR_EDIT: (state, payload) => {
      state.proxy.forEdit = payload;
    }
  },
  actions: {
    ...mixinDialogActions,
    
    async loadProxy({commit}) {
      const response = await this._vm.api('/proxy');
      if (typeof response.data.data !== 'undefined') {
        commit('SET_PROXY', response.data.data);
        commit('FILTER_PROXY');
      }
    },

    async saveSelected({commit}, payload) {
      commit('SET_SELECTED', payload);
    },

    async savePermissions({commit, dispatch}, data) {
      commit('SET_LOADING', {
        param: 'share',
        value: true
      });

      const response = await this._vm.api.post('/proxy/update_permissions', data).catch((e) => {
        dispatch(
          'main/apiError', 
          {
            method: '/proxy/update_permissions',
            request: data,
            response: e,
          }, 
          {
            root: true
          }
        );
      });

      commit('SET_LOADING', {
        param: 'share',
        value: false
      });

      if (response.data.success) {
        dispatch('loadProxy');
      } else {
        dispatch('main/apiError', response.data, {
          root: true
        });
      }

      return response.data.success;
    },

    async setFilter({commit}, payload) {
      commit('SET_FILTER', payload);
    },

    async filterProxy({commit}) {
      commit('FILTER_PROXY');
    },

    async addProxy({
      commit,
      dispatch
    }, payload) {
      commit('SET_LOADING', {
        param: 'add',
        value: true
      });

      await this._vm.api.post('/proxy/add', {proxy: payload}).catch((e) => {
        dispatch(
          'main/apiError', {
            method: '/proxy/add',
            request: payload,
            response: e,
          }, {
            root: true
          }
        );
      });

      commit('SET_LOADING', {
        param: 'add',
        value: false
      });

      return true;
    },

    async setForPermissions({commit}, payload) {
      commit('SET_FOR_PERMISSIONS', payload);
    },

    async setForEdit({commit}, payload) {
      commit('SET_FOR_EDIT', payload);
    },

    async saveProxy({dispatch}, payload) {
      console.log(JSON.stringify(payload));
      await this._vm.api.post('/proxy/update', payload).catch((e) => {
        dispatch(
          'main/apiError', {
            method: '/proxy/update',
            request: payload,
            response: e,
          }, {
            root: true
          }
        );
      });

      dispatch('loadProxy');
    },
  }
};