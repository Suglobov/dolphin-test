<template>
  <v-combobox
    :label="$t('filters.tags')"
    :items="tags.all"
    :value="globalFilters.tags"
    multiple
    chips
    deletable-chips
    clearable
    dense
    small-chips
    solo
    prepend-inner-icon="fas fa-tags"
    hide-details
    @change="filterTags"
  />
</template>

<script>
import { mapGetters }  from 'vuex';

export default {
  name: 'AdsManagerFiltersTags',

  computed: {
    ...mapGetters({
      tags: 'tags/tags',
      globalFilters: 'adsmanager/filters'
    })
  },

  created() {
    this.$store.dispatch('tags/loadTags');
  },

  methods: {
    filterTags(tags) {
      if(tags) {
        this.$emit('filtered');
      }
      this.$store.dispatch('adsmanager/setFiltersTags', tags);
    }
  }
};
</script>