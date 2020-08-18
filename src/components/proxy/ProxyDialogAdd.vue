<template>
  <v-dialog
    :value="dialogs.add"
    persistent
    fullscreen
  >
    <v-card :loading="loading.add">
      <v-toolbar
        color="primary"
      >
        <v-btn
          icon
          @click="$store.dispatch('proxy/closeDialog', 'add')"
        >
          <v-icon>fas fa-times</v-icon>
        </v-btn>
        <v-toolbar-title>{{ $t('dialogs.proxy.add.title') }}</v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-btn
            :disabled="newProxy.length === 0"
            text
            @click="addProxy"
          >
            {{ $t('common.add') }}
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col
            col="12"
            md="6"
          >
            <v-alert
              color="primary"
              text
              v-html="$t('dialogs.proxy.add.formats')"
            />

            <v-textarea
              v-model="inputRaw"
              outlined
              rows="10"
            />
          </v-col>
          <v-col
            col="12"
            md="6"
          >
            <h3>{{ $t('dialogs.proxy.add.checkYourself') }}:</h3>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th>{{ $t('common.type') }}</th>
                    <th>{{ $t('common.host') }}</th>
                    <th>{{ $t('common.port') }}</th>
                    <th>{{ $t('common.login') }}</th>
                    <th>{{ $t('common.password') }}</th>
                    <th>{{ $t('common.name') }}</th>
                  </tr>
                </thead>
                <tbody v-if="newProxy.length > 0">
                  <tr
                    v-for="(proxy, index) in newProxy"
                    :key="`new-proxy-${index}`"
                  >
                    <td>{{ proxy.type }}</td>
                    <td>{{ proxy.host }}</td>
                    <td>{{ proxy.port }}</td>
                    <td>{{ proxy.login || '-' }}</td>
                    <td>{{ proxy.password || '-' }}</td>
                    <td>{{ proxy.name || '-' }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapGetters} from 'vuex';
    
export default {
  name: 'ProxySingleAddDialog',

  data() {
    return {
      newProxy: [],
      inputRaw: '',
    };
  },

  computed: {
    ...mapGetters({
      dialogs: 'proxy/dialogs',
      loading: 'proxy/loading',
    })
  },

  watch: {
    inputRaw() {
      this.parse();
    }
  },

  methods: {
    async addProxy() {
      await this.$store.dispatch('proxy/addProxy', this.newProxy);
      await this.$store.dispatch('proxy/loadProxy');
      await this.$store.dispatch('proxy/closeDialog', 'add');
    },

    parse() {
      const lines = this.inputRaw.split('\n');
      
      this.newProxy = [];
      
      if (lines.length === 0) {
        return;
      }

      lines.forEach(line => {
        if (!line.trim()) return;

        let proxy = {
          type: 'http',
          login: null,
          password: null,
          host: null,
          port: null,
          name: null,
        };

        // определить тип прокси
        if (line.split('://').length > 1) {
          proxy.type = line.split('://')[0].toLowerCase();
          if (proxy.type === 'https') proxy.type = 'http';
          if (proxy.type === 'socks') proxy.type = 'socks5';
          line = line.split('://')[1];
        }
        
        if (line.search('@') > -1) {
          let left, right;
          left = line.split('@')[0];
          right = line.split('@')[1];
          proxy.login = left.split(':')[0];
          proxy.password = left.split(':')[1];
          proxy.host = right.split(':')[0];
          proxy.port = right.split(':')[1];
          if (right.split(':').length === 3) {
            proxy.name = right.split(':')[2];
          }
        } else {
          if (line.split(':').length === 2) {
            proxy.host = line.split(':')[0];
            proxy.port = line.split(':')[1];
          } else if (line.split(':').length === 3) {
            proxy.host = line.split(':')[0];
            proxy.port = line.split(':')[1];
            proxy.name = line.split(':')[2];
          } else if (line.split(':').length === 4) {
            proxy.host = line.split(':')[0];
            proxy.port = line.split(':')[1];
            proxy.login = line.split(':')[2];
            proxy.password = line.split(':')[3];
          } else if (line.split(':').length === 5) {
            proxy.host = line.split(':')[0];
            proxy.port = line.split(':')[1];
            proxy.login = line.split(':')[2];
            proxy.password = line.split(':')[3];
            proxy.name = line.split(':')[4];
          }
        }

        if (proxy.host && proxy.port) {
          this.newProxy.push(proxy);
        }
      });
    }
  }
};
</script>