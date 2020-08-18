<template>
  <div style="float: right;">
    <loading
      v-if="dialogs.refresh"
      :done="done" 
      :cabs-ids="cabsIds"
    />
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          small
          color="
      primary"
          text
          style="min-width: 0; width: 30px; margin-top: 1px;"
          class="ml-3"
          @click="refresh"
          v-on="on"
        >
          <v-icon :size="18">
            sync
          </v-icon>
        </v-btn>
      </template>
      <span>{{ $t('common.refreshStat') }}</span>
    </v-tooltip>
</div>
</template>

<script>
import {mapGetters} from 'vuex';

import Loading      from './AdsManagerRefreshLoading';

export default {
  name: 'AdsManagerRefresh',

  components: {
    Loading
  },

  data() {
    return {
      done: 0,
      cabsIds: [],
    };
  },

  computed: {
    ...mapGetters({
      cabs: 'cabs/cabs',
      dialogs: 'adsmanager/dialogs',
      activeTab: 'adsmanager/activeTab'
    })
  },

  created() {
    // console.log(this.cabs.all);
    // const a = null;
    // console.log(a.a);
  },

  methods: {
    async refresh() {
      if (this.cabs.all.length === 0) {
        await this.$store.dispatch('cabs/loadCabs');
        this.cabsIds = this.cabs.all.map(cab => cab.id);
      } else {
        if (this.cabs.selected.length > 0) {
          this.cabsIds = this.cabs.selected.map(cab => cab.id);
        } else if(this.cabs.filtered.length > 0) {
          this.cabsIds = this.cabs.filtered.map(cab => cab.id);
        } else {
          this.cabsIds = this.cabs.all.map(cab => cab.id);
        }
      }
      if (!this.cabsIds || this.cabsIds.length === 0) return;

      this.$store.dispatch('adsmanager/openDialog', 'refresh');
      this.cabsIds.forEach(cabId => {
        this.api(`/cabs/stat/${cabId}`).finally(() => {
          this.done++;
          console.log(this.done);
          if (this.done === this.cabsIds.length) {
            this.done = 0;
            this.$store.dispatch(`${this.activeTab.component}/loadStat`);
            this.$store.dispatch('adsmanager/closeDialog', 'refresh');
          }
        });
      });
      
    }
  }
};
</script>