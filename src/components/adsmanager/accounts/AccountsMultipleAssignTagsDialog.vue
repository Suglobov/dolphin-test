<template>
  <v-dialog
    :value="dialogs.multipleAssignTags"
    max-width="600px"
    persistent
  >
    <v-card :loading="loading.multipleAssignTags">
      <!-- ЗАГОЛОВОК -->
      <v-card-title>
        <span class="headline">
          {{ $t('dialogs.accounts.multipleAssignTags.title') }}
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
                    :label="$t('dialogs.accounts.multipleAssignTags.addTags')"
                    :value="1"
                  />
                  <v-radio
                    :label="$t('dialogs.accounts.multipleAssignTags.removeTags')"
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
          @click="$store.dispatch('accounts/closeDialog', 'multipleAssignTags')"
        >
          {{ $t('common.close') }}
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
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
  name: 'AccountsMultipleAssignTagsDialog',
        
  data() {
    return {
      mode: 1,
      selectedTags: [],
    };
  },

  computed: {
    ...mapGetters({
      dialogs: 'accounts/dialogs',
      tags: 'tags/tags',
      accounts: 'accounts/selected',
      loading: 'accounts/loading'
    })
  },

  created() {
    this.$store.dispatch('tags/loadTags');
  },

  methods: {
    async saveTags() {
      const data = {
        ids: this.accounts.map(account => account.id),
        tags: this.selectedTags,
        mode: this.mode,
      };
      const success = await this.$store.dispatch('accounts/saveMultipleTags', data);
      if (success) {
        this.$store.dispatch('tags/loadTags');
        this.$store.dispatch('accounts/closeDialog', 'multipleAssignTags');
      }
    }
  }
};
</script>