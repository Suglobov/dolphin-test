<template>
  <v-dialog
    :value="dialogs.assignTags"
    persistent
    max-width="600px"
  >
    <v-card :loading="loading.assignTagsDialog">
      <v-card-title>
        <span class="headline">
          {{ $t('dialogs.accounts.assignTags.title', {accountName: newAccount.name}) }}
        </span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
            >
              <v-combobox
                v-model="newAccount.tags"
                :label="$t('common.tags')"
                :items="tags.all"
                multiple
                chips
                deletable-chips
                clearable
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue darken-1"
          text
          @click="$store.dispatch('accounts/closeDialog', 'assignTags')"
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
  name: 'AccountsAssignTagsDialog',
        
  data: () => (
    {
      newAccount: {
        name: '',
      }
    }
  ),

  computed: {
    ...mapGetters({
      dialogs: 'accounts/dialogs',
      tags: 'tags/tags',
      account: 'accounts/accountForAssigningTags',
      loading: 'accounts/loading'
    })
  },

  created() {
    this.newAccount = {...this.account};
    this.$store.dispatch('tags/loadTags');
  },

  methods: {
    async saveTags() {
      const success = await this.$store.dispatch('accounts/saveTags', this.newAccount);
      if (success) {
        this.$store.dispatch('tags/loadTags');
        this.$store.dispatch('accounts/closeDialog', 'assignTags');
      }
    }
  }
};
</script>