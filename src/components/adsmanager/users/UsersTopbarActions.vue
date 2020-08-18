<template>
  <div style="float: left;">
    <!-- УДАЛИТЬ -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          small
          color="primary"
          text
          style="min-width: 0; width: 30px; margin-top: 1px;"
          :disabled="users.selected.length === 0 || profile.role_id !== 1"
          v-on="on"
          @click="deleteUsers"
        >
          <v-icon :size="12">
            fas fa-trash-alt
          </v-icon>
        </v-btn>
      </template>
      <span>{{ $t('common.delete') }}</span>
    </v-tooltip>

    <!-- СЧЕТЧИК -->
    <span
      class="body-2 ml-1"
      :style="{color: users.selected.length > 0 ? '' : 'gray'}"
    >
      {{ $t('common.selected') }} : {{ users.selected.length }}
    </span>
  </div>
</template>

<script>
import {mapGetters}          from 'vuex';

export default {
  name: 'UsersTopbarActions',

  components: {
    
  },

  computed: {
    ...mapGetters({
      users: 'users/users',
      profile: 'main/profile'
    })
  },

  methods: {
    deleteUsers() {
      if (!confirm(this.$t('common.confirmPlease'))) return;
      if (!this.users.selected || this.users.selected.length === 0) return;

      this.users.selected.forEach(user => {
        this.$store.dispatch('users/deleteUser', user.id);
      });
    }
  }
};
</script>