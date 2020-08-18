<template>
  <div style="padding-left: 8px;">
    <flag
      :iso="languageFlag"
      style="width: 20px; background-size: 100% 100%;"
    />
    <span v-if="mini">
      {{ profile.language || 'en' }}
    </span>
    <select
      v-if="!mini"
      class="mx-3"
      style="cursor: pointer; text-decoration: underline;"
      @change="switchLanguage($event.target.value)"
    >
      <option
        value="en"
        :selected="profile.language === 'en'"
      >
        English
      </option>
      <option
        value="ru"
        :selected="profile.language === 'ru'"
      >
        Русский
      </option>
    </select>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'SidebarLanguageSwitcher',

  props: {
    mini: {
      type: Boolean,
      default: true,
    }
  },

  data() {
    return {
      language: '',
    };
  },

  computed: {
    ...mapGetters({
      profile: 'main/profile'
    }),

    languageFlag() {
      switch(this.profile.language) {
      case 'en':
        return 'gb';
      case 'ru':
        return 'ru';
      }

      return 'gb';
    }
  },

  methods: {
    async switchLanguage(language) {
      await this.api.post('/profile/update_language', {language: language});
      localStorage.setItem('language', language);
      location.reload();
    }
  }
};
</script>