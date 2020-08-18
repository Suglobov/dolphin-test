<template>
  <v-row justify="center">
    <v-dialog
      persistent
      :value="dialogs.apiError"
      scrollable
      max-width="700px"
    >
      <v-card>
        <v-card-title>{{ $t('dialogs.apiError.title') }}</v-card-title>
        <v-divider />
        <v-card-text
          class="pt-3"
        >
          {{ $t('dialogs.apiError.message') }}:
          <code>
            {{ apiError }}
          </code>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-btn
            color="blue darken-1"
            text
            @click="$store.dispatch('main/closeDialog', 'apiError')"
          >
            {{ $t('common.close') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'ApiError',

  computed: {
    ...mapGetters({
      dialogs: 'main/dialogs',
      apiError: 'main/apiError',
    })
  }
};
</script>

<style>
    code {
        width: 100%;
        margin-top: 16px;
    }
</style>