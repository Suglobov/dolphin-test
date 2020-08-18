export default {
  methods: {
    selectItem(item, state) {
      let selected = [];
      selected = selected.concat(this.selected);

      if (state) {
        selected.push(item);
      } else {
        selected = selected.filter(selectedItem => {
          if (selectedItem.id === item.id) return false;
          return true;
        });
      }
      this.$store.dispatch(`${this.$store.state.adsmanager.activeTab.component}/saveSelected`, selected);
    },

    selectAll() {
      if (arguments[0]['value']) {
        this.$store.dispatch(`${this.$store.state.adsmanager.activeTab.component}/saveSelected`, arguments[0]['items']);
      } else {
        this.$store.dispatch(`${this.$store.state.adsmanager.activeTab.component}/saveSelected`, []);
      }
    }
  }
};