<template>
  <div>
    <tabs />
    <!-- <columns-dialog v-if="dialogs.columns" /> -->
    <div style="padding: 8px;">
      <component :is="activeTab.component" />
    </div>
  </div>
</template>

<script>
import facebookApi  from '@/components/settings/SettingsFacebookApi';
import general      from '@/components/settings/SettingsGeneral';
import tabs         from '@/components/settings/SettingsTabs';
import {mapGetters} from 'vuex';

export default {
  name: 'Settings',
        
  components: {
    facebookApi,
    general,
    tabs
  },

  data() {
    return {
      localSettings:{}
    };
  },

  computed: {
    ...mapGetters({
      activeTab: 'settings/activeTab'
    })
  },
};
</script>