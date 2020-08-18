import {
  mixinDialogMutations,
  mixinDialogActions,
  mixinDialogGetters
} from '../../mixins/vuex_dialogs';

export default {
  namespaced: true,
  state: {
    activeTab: localStorage.getItem('settings-active-tab') ?
      JSON.parse(localStorage.getItem('settings-active-tab')) : {
        tab: 0,
        component: 'general'
      },
    dialogs: {
    },
    settings: {
      general: {
        use_global: false,
        change_ip_from_ui: false,
      },
      intervals: {
        sync: 0,
        sync_time: 0,
        comments: 0,
        comments_time: 0,
        comments_mode: null,
      }
    },
    globals: {
      state: false,
      admin_id: null
    }
  },
  getters: {
    ...mixinDialogGetters,
    
    activeTab: (state) => state.activeTab,
    settings: state => state.settings,
    globals: state => state.globals,
  },
  mutations: {
    ...mixinDialogMutations,

    SET_ACTIVE_TAB: (state, tab) => {
      state.activeTab = tab;
      localStorage.setItem('settings-active-tab', JSON.stringify(tab));
    },

    SET_SETTINGS: (state, payload) => {
      state.settings = payload;
    },

    SET_GLOBALS: (state, payload) => {
      state.global = payload;
    }
  },
  actions: {
    ...mixinDialogActions,

    async setActiveTab(context, tab) {
      context.commit('SET_ACTIVE_TAB', tab);
    },

    async loadSettings({commit}) {
      let response = await this._vm.api('/settings');
      if (typeof response.data.data != 'undefined') {
        let settings = response.data.data.settings;
        
        if (typeof settings.intervals === 'undefined') {
          settings.intervals = {
            sync: 0,
            sync_time: 0,
            comments: 0,
            comments_time: 0,
            comments_mode: null,
          };
        }
        if (typeof settings.general === 'undefined') {
          settings.general = {
            change_ip_from_ui: false
          };
        }

        if (typeof settings.intervals.sync === 'undefined') {
          settings.intervals.sync = 0;
        }

        if (typeof settings.intervals.sync_time === 'undefined') {
          settings.intervals.sync_time = 0;
        }

        if (typeof settings.intervals.comments === 'undefined') {
          settings.intervals.comments = 0;
        }

        if (typeof settings.intervals.comments_time === 'undefined') {
          settings.intervals.comments_time = 0;
        }

        if (typeof settings.intervals.comments_mode === 'undefined') {
          settings.intervals.comments_mode = 0;
        }

        console.log(settings);

        commit('SET_SETTINGS', settings);
        commit('SET_GLOBALS', response.data.data.globals);
      }
    },

    async saveSettings({dispatch}, payload) {
      await this._vm.api.post('/settings/update', {settings: payload});
      dispatch('loadSettings');
    }
  },
};