<template>
  <div>
    <!-- ССЫЛКА НА ПРОФИЛЬ -->
    <div v-if="account.fb_id && account.fb_name">
      {{ $t('common.facebookProfile') }}: <a
        :href="'https://facebook.com/profile.php?id=' + account.fb_id"
        target="_blank"
      >
        <a-icon type="user" />
        {{ account.fb_name }}
      </a>
    </div>
    <!-- ССЫЛКА НА ПРОФИЛЬ КОНЕЦ-->

    <!-- ID ПРОФИЛЯ -->
    <div v-if="account.fb_id">
      {{ $t('common.facebookId') }}: {{ account.fb_id }}
    <!-- ID ПРОФИЛЯ КОНЕЦ-->
    </div>
  </div>
</template>

<script>
import clipboard from '../../../mixins/clipboard';

export default {
  name: 'AccountsMainTableFacebookProfile',
  mixins: [clipboard],
  props: {
    account: {
      type: Object,
      default: () => ({
        fb_id: null,
        fb_name: null,
      })
    }
  }
};
</script>

<style scoped>

</style>