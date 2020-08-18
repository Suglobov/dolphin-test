<template>
  <v-dialog
    :value="dialogs.noFacebookIdInfo"
    width="500"
  >
    <v-card>
      <v-card-title
        class="headline"
        primary-title
      >
        {{ $t('adsmanager.accounts.noFacebookIdInfo.title') }}
      </v-card-title>

      <v-card-text>
        <p>
          {{ $t('adsmanager.accounts.noFacebookIdInfo.1') }}
        </p>
        <p>
          {{ $t('adsmanager.accounts.noFacebookIdInfo.2') }}
        </p>
        <p>
          {{ $t('adsmanager.accounts.noFacebookIdInfo.3') }}
        </p>
        <p>
          {{ $t('adsmanager.accounts.noFacebookIdInfo.4') }}
        </p>
        <p>
          {{ $t('adsmanager.accounts.noFacebookIdInfo.5') }}
        </p>
        <p>
          {{ $t('adsmanager.accounts.noFacebookIdInfo.6') }}
        </p>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          text
          @click="$store.dispatch('accounts/closeDialog', 'noFacebookIdInfo')"
        >
          {{ $t('adsmanager.accounts.noFacebookIdInfo.button') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'AccountsDialogNoFacebookIdInfo',

  computed: {
    ...mapGetters({
      dialogs: 'accounts/dialogs'
    })
  }
};
</script>