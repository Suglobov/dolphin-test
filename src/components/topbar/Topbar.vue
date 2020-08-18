<template>
  <v-system-bar
    fixed
    color="primary"
    style="padding-left: 72px;"
  >
    <v-spacer />
    
    <topbar-locale />

    <v-divider vertical />

    <span class="mx-2">ver. 2020.106.4</span>
    
    <v-divider vertical />
    
    <span class="mx-2">
      deniszhitnyakov
      <v-icon>material-icons exit_to_app</v-icon>
    </span>
  </v-system-bar>
</template>

<script>
import TopbarLocale from './TopbarLocale';

export default {
  name: 'Topbar',
  components: {
    TopbarLocale
  }
};
</script>