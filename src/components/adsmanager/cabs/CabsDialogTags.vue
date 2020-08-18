<template>
  <v-dialog
    :value="dialogs.tags"
    max-width="600px"
    persistent
  >
    <v-card :loading="loading.tags">
      <!-- ЗАГОЛОВОК -->
      <v-card-title>
        <span class="headline">
          {{ $t('dialogs.tags.title') }}
        </span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
            >
              <!-- ТЕГИ -->
              <v-combobox
                v-model="selectedTags"
                :label="$t('common.tags')"
                :items="tags.all"
                multiple
                chips
                deletable-chips
                clearable
                dense
                hide-details
              />

              <!-- ВЫБОР РЕЖИМА -->
              <div>
                <v-radio-group
                  v-model="mode"
                  row
                  dense
                  style="margin-top: 0px;"
                  hide-details
                  class="mt-3"
                >
                  <v-radio
                    :label="$t('dialogs.tags.addTags')"
                    :value="1"
                  />
                  <v-radio
                    :label="$t('dialogs.tags.removeTags')"
                    :value="-1"
                  />
                </v-radio-group>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue darken-1"
          text
          @click="$store.dispatch('cabs/closeDialog', 'tags')"
        >
          {{ $t('common.close') }}
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          :disabled="!selectedTags || selectedTags.length === 0"
          @click="saveTags"
        >
          {{ $t('common.save') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'CabsDialogTags',
        
  data() {
    return {
      mode: 1,
      selectedTags: [],
    };
  },

  computed: {
    ...mapGetters({
      dialogs: 'cabs/dialogs',
      tags: 'tags/tags',
      cabs: 'cabs/selected',
      loading: 'cabs/loading'
    })
  },

  created() {
    this.$store.dispatch('tags/loadTags');
  },

  methods: {
    async saveTags() {
      const data = {
        ids: this.cabs.map(cab => cab.id),
        tags: this.selectedTags,
        mode: this.mode,
      };
      const success = await this.$store.dispatch('cabs/saveMultipleTags', data);
      if (success) {
        this.$store.dispatch('tags/loadTags');
        this.$store.dispatch('cabs/closeDialog', 'tags');
      }
    }
  }
};
</script>