import 'material-design-icons-iconfont/dist/material-design-icons.css';
import en      from 'vuetify/es5/locale/en';
import ru      from 'vuetify/es5/locale/ru';
import Vuetify from 'vuetify/lib';
import Vue     from 'vue';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: !localStorage.getItem('dark-mode') 
      ? false
      : localStorage.getItem('dark-mode') === 'false' ? false : true,
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#2196F3',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      },
    },
  },
  lang: {
    locales: {
      en,
      ru
    },
    current: localStorage.getItem('language') || 'en',
  },
  icons: {
    iconfont: 'md',
  },
});