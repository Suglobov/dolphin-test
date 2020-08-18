<template>
  <v-dialog
    v-model="showLoading"
    hide-overlay
    persistent
    width="300"
    content-class="loading-modal"
  >
    <v-card
      color="primary"
    >
      <v-card-text>
        <div style="display: flex; justify-content: space-between;">
          <div>
            {{ $t('dialogs.proxy.check.loadingText') }}...
          </div>
          <div>
            {{ done }} / {{ proxy.selected.length }}
          </div>
        </div>
          
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'ProxyDialogCheck',

  data() {
    return {
      showLoading: false,
      done: 0,
    };
  },

  computed: {
    ...mapGetters({
      proxy: 'proxy/proxy',
    })
  },

  created() {
    this.check();
  },

  methods: {
    check() {
      if (!confirm(this.$t('common.confirmPlease'))) {
        this.$store.dispatch('proxy/closeDialog', 'check');
        return;
      }

      this.done = 0;
      if (this.proxy.selected && this.proxy.selected.length > 0) {
        
        this.showLoading = true;
        
        this.proxy.selected.forEach(proxy => {
          this.api.post('/proxy/check', {id: proxy.id}).then(() => {
            this.done++;
            this.$store.dispatch('proxy/loadProxy');
            if (this.done === this.proxy.selected.length) {
              this.showLoading = false;
              this.$store.dispatch('proxy/closeDialog', 'check');
            }
          });
        });
      }
    }
  }
};
</script>
<style scoped>
  .v-dialog__content:nth-child(1) {
  align-items: flex-end !important;
}
</style>