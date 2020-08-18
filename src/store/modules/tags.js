export default {
  namespaced: true,
  state: {
    tags: {
      all: []
    },
  },
  getters: {
    tags: state => state.tags
  },
  mutations: {
    SET_TAGS: (state, tags) => {
      state.tags.all = tags;
    }
  },
  actions: {
    async loadTags(context) {
      const response = await this._vm.api('/tags');
      if (typeof response.data.data !== 'undefined') {
        context.commit('SET_TAGS', response.data.data);
      }
    }
  }
};