<template>
  <v-container style="overflow-y: scroll;">
    <v-row style="overflow-y:scroll; height: 100vh;">
      <v-col cols="12">
        <h1>API Documentation</h1>
      </v-col>
      <!-- <v-col cols="12">
        <h2>Contents</h2>
      </v-col>
      <v-col cols="12">
        <ul>
          <li><a href="#howto">How to work with</a></li>
          <li>
            <a href="#accounts">Accounts</a>
            <ul>
              <a href="#accounts"><li>Accounts list</li></a>
              <a href="#accounts"><li>Add account</li></a>
            </ul>
          </li>
          <li>
            <a @click="$vuetify.goTo('#proxy', {duration: 1})">Proxy</a>
            <ul>
              <a href="#accounts"><li>Proxy list</li></a>
              <a href="#accounts"><li>Add proxy</li></a>
            </ul>
          </li>
        </ul>
      </v-col> -->
      <v-col cols="12">
        <h2 id="howto">
          How to work with
        </h2>
      </v-col>
      <v-col cols="12">
        <p>Make all requests with base URL <code class="d-inline">{{ baseUrl }}</code></p>
        <p>
          Use two headers to complete request:
          <pre>
<code>
  Content-Type: application/json
  Authorization: {{ Cookies.get('user_id') }}-{{ Cookies.get('hash') }}
</code>
</pre>
          Authorization token is already yours. We toke it from your cookies right now ;)
          <!-- If doing POST request be sure you send json-encode data in request body. -->
        </p>
      </v-col>
      
      <v-col cols="12">
        <h2 id="users">
          Users
        </h2>
      </v-col>

      <v-col cols="12">
        <code class="d-inline">GET /users</code>
      </v-col>

      <v-col cols="12">
        <h2 id="accounts">
          Accounts
        </h2>
      </v-col>

      <v-col cols="12">
        <h3 id="accounts">
          Accounts list
        </h3>
      </v-col>

      <v-col cols="12">
        <code class="d-inline">POST /accounts</code>
        <pre>
<code>
  {
    "users_ids": [] // required
  }
</code>
</pre>
        <p>
          <code class="d-inline">users_ids</code> can be one of:
          <ul>
            <li>array of users ids. <code class="d-inline">[1, 4, 5]</code> for example</li>
            <li>just <code class="d-inline">-1</code> to get accounts from all available users</li>
          </ul>
        </p>
      </v-col>

      <v-col cols="12">
        <h3 id="accounts">
          Add account
        </h3>
      </v-col>

      <v-col cols="12">
        <code class="d-inline">POST /accounts/add</code>
        <pre>
<code>
  {
    "name": "",
    "access_token": "",
    "tags": [],
    "user_agent": "",
    "proxy": {
      "id": null,
      "name": null,
      "ip": null,
      "port": null,
      "type": null,
      "login": null,
      "password": null
    }
  }
</code>
</pre>
        <p>
          1. <code class="d-inline">user_agent</code> and <code class="d-inline">proxy</code> are optional.<br>
          2. You can set existing proxy id into <code class="d-inline">proxy.id</code>. In this case new proxy will not be created.<br>
        </p>
      </v-col>

      <v-col cols="12">
        <h2 id="proxy">
          Proxy
        </h2>
      </v-col>

      <v-col cols="12">
        <h3 id="accounts">
          Proxy list
        </h3>
      </v-col>

      <v-col cols="12">
        <code class="d-inline">GET /proxy</code>
      </v-col>

      <v-col cols="12">
        <h3 id="accounts">
          Add proxy
        </h3>
      </v-col>

      <v-col cols="12">
        <code class="d-inline">POST /proxy/add</code>
        <pre>
<code>
  {
    "proxy": [
      {
        "name": null,
        "host": null, // required
        "port": null, // required
        "type": null,
        "login": null,
        "password": null,
      },
      ...
    ]
  }
  
</code>
</pre>
        <p>
          You can add multiple proxy with one request.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Cookies from 'js-cookie';

export default {
  name: 'Api',

  data() {
    return {
      Cookies,
    };
  },

  computed: {
    baseUrl() {
      return location.protocol + '//' + location.host + '/new';
    }
  }
};
</script>