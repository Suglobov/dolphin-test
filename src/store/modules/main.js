import {
  mixinDialogMutations,
  mixinDialogActions,
  mixinDialogGetters
} from '../../mixins/vuex_dialogs';

export default {
  namespaced: true,
  state: {
    profile: {
      columns: [],
    },
    breadcrumbs: [],
    sidebarCollapsed: false,
    dialogs: {
      apiError: false,
      alert: false,
    },
    apiError: '',
    innerHeight: 0,
    alert: {
      color: '',
      message: '',
    }
  },
  getters: {
    ...mixinDialogGetters,

    breadcrumbs: state => {
      return state.breadcrumbs;
    },

    apiError: state => state.apiError,

    innerHeight: state => state.innerHeight,

    alert: state => state.alert,

    profile: state => state.profile,
  },
  mutations: {
    ...mixinDialogMutations,

    setBreadcrumbs: ( state, breadcrumbs ) => {
      state.breadcrumbs = breadcrumbs;
    },
    
    toggleSidebar: ( state ) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },

    setUser: (state, user) => {
      state.user = {...user};
    },

    SET_API_ERROR: (state, error) => {
      state.apiError = error;
    },

    SET_INNER_HEIGHT: (state, height) => {
      state.innerHeight = height;
    },

    SET_ALERT: (state, alert) => {
      state.alert = alert;
    },

    OPEN_ALERT: (state) => {
      state.dialogs.alert = true;
    },

    CLOSE_ALERT: (state) => {
      state.dialogs.alert = false;
    },

    SET_PROFILE: (state, profile) => {
      state.profile = profile;
    }
  },

  actions: {
    ...mixinDialogActions,

    async loadProfile(context) {
      const response = await this._vm.api('/profile');
      if (typeof response.data.data !== 'undefined') {
        context.commit('SET_PROFILE', response.data.data);
      }

      return true;
    },

    async apiError(context, error) {
      context.commit('SET_API_ERROR', error);
      context.commit('OPEN_DIALOG', 'apiError');
    },

    async setInnerHeight(context, height) {
      context.commit('SET_INNER_HEIGHT', height);
    },

    async alert(context, alert) {
      context.commit('CLOSE_ALERT');
      context.commit('SET_ALERT', alert);
      context.commit('OPEN_ALERT');
      setTimeout(() => {
        context.commit('CLOSE_ALERT');
      }, 3000);
    },

    async closeAlert(context) {
      context.commit('CLOSE_ALERT');
    },
  }
};