<template>
  <div style="padding-left: 8px;">
    <v-switch
      v-model="$vuetify.theme.dark"
      dense
      class="mt-1"
    >
      <template #label>
        <div v-if="!mini">
          <span>
            Dark mode
          </span>
        </div>
      </template>
    </v-switch>
  </div>
</template>

<script>
export default {
  name: 'SidebarDarkMode',
    
  props: {
    mini: {
      type: Boolean,
      default: true
    }
  },

  watch: {
    '$vuetify.theme.dark': {
      handler(mode) {
        this.api.post('/profile/update_theme_mode', {theme_mode: mode ? 'dark' : 'light'});
        localStorage.setItem('dark-mode', mode);
      }
    }
  }
};
</script>