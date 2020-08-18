<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn
        :disabled="cabs.selected.length === 0"
        small
        color="primary"
        text
        style="min-width: 0; width: 30px; margin-top: 1px;"
        v-on="on"
        @click="archive"
      >
        <v-icon :size="12">
          fas fa-archive
        </v-icon>
      </v-btn>
    </template>
    <span>{{ $t('common.archive') }}</span>
  </v-tooltip>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'CabsDialogArchive',

  computed: {
    ...mapGetters({
      cabs: 'cabs/cabs'
    })
  },

  methods: {
    archive() {
      if (confirm(this.$t('common.confirmPlease'))) {
        const data = {
          ids: this.cabs.selected.map(cab => cab.id)
        };
        this.$store.dispatch('cabs/archive', data);
      }
    }
  }
};
</script>