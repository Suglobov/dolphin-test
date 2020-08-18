<template>
  <v-navigation-drawer
    expand-on-hover
    :mini-variant.sync="mini"
    fixed
  >
    <v-list
      nav
    >
      <v-list-item-group

        active-class="blue--text text--accent-4"
      >
        <!-- ADS MANAGER -->
        <v-list-item :to="{path: '/adsmanager'}">
          <v-list-item-icon>
            <v-icon>
              fab fa-facebook-square
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ $t("sidebar.adsManager") }}
          </v-list-item-title>
        </v-list-item>

        <!-- ПРОКСИ -->
        <v-list-item :to="{path: '/proxy'}">
          <v-list-item-icon>
            <v-icon style="margin-left: 2px;">
              fas fa-plug
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ $t("common.proxy") }}
          </v-list-item-title>
        </v-list-item>

        <!-- НАСТРОЙКИ -->
        <!-- <v-list-item :to="{path: '/settings'}">
          <v-list-item-icon>
            <v-icon style="">
              fas fa-cog
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ $t("common.settings") }}
          </v-list-item-title>
        </v-list-item> -->

        <!-- API -->
        <v-list-item :to="{path: '/api'}">
          <v-list-item-icon>
            <v-icon
              style="margin-left: 1px;"
              :size="18"
            >
              fas fa-code
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            API
          </v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <template v-slot:append>
      <language-switcher :mini="mini" />      
      <dark-mode :mini="mini" />
    </template>
  </v-navigation-drawer>
</template>

<script>
import DarkMode             from './sidebar/SidebarDarkMode';
import LanguageSwitcher     from './sidebar/SidebarLanguageSwitcher';

export default {
  name: 'Sidebar',

  components: {
    DarkMode,
    LanguageSwitcher
  },

  data() {
    return {
      mini: true
    };
  },
};
</script>