<template>
  <div style="margin-left: -6px !important">
    <!-- ТЕГИ -->
    <v-btn
      icon
      small
      :color="useColors ? 'success' : ''"
      @click="assignTags(account)"
    >
      <v-icon size="12px">
        fas fa-tags
      </v-icon>
    </v-btn>

    <!-- РАЗДАЧА -->
    <v-btn
      icon
      small
      :color="useColors ? 'success' : ''"
      @click="shareAccount(account)"
    >
      <v-icon size="12px">
        fas fa-share-alt
      </v-icon>
    </v-btn>

    <!-- ПРОВЕРКА ТОКЕНА -->
    <v-btn
      icon
      small
      :color="useColors ? 'warning' : ''"
      @click="$store.dispatch('accounts/checkToken', account)"
    >
      <v-icon size="12px">
        fas fa-code
      </v-icon>
    </v-btn>

    <!-- РЕДАКТИРОВАНИЕ -->
    <v-btn
      icon
      small
      :color="useColors ? 'warning' : ''"
      @click="editAccount(account)"
    >
      <v-icon size="12px">
        fas fa-pencil-alt
      </v-icon>
    </v-btn>
      
    <!-- УДАЛЕНИЕ -->
    <v-btn
      icon
      small
      :color="useColors ? 'error' : ''"
      @click="deleteAccount(account)"
    >
      <v-icon size="12px">
        fas fa-trash-alt
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'AccountsMainTableStatus',
        
  props: {
    account: {
      type: Object,
      default: () => ({
        id: -1,
      })
    }
  },

  data() {
    return {
      useColors: false,
    };
  },
        
  methods: {
    deleteAccount(account) {
      if(confirm(this.$t('dialogs.confirm'))) {
        this.$store.dispatch('accounts/DELETE_ACCOUNTS', [account.id]);
      }
    },
          
    assignTags(account) {
      this.$store.dispatch('accounts/setAccountForAssigningTags', account);
      this.$store.dispatch('accounts/openDialog', 'assignTags');
    },

    shareAccount(account) {
      this.$store.dispatch('accounts/initAccountForShare', account);
    },

    editAccount(account) {
      this.$store.dispatch('accounts/initAccountForEdit', account);
    }
  }
};
</script>