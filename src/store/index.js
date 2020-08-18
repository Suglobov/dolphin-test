import Vuex       from 'vuex';
import Vue        from 'vue';

import accounts   from './modules/accounts';
import adsets     from './modules/adsets';
import adsmanager from './modules/adsmanager';
import ads        from './modules/ads';
import bms        from './modules/bms';
import bundles    from './modules/bundles';
import cabs       from './modules/cabs';
import campaigns  from './modules/campaigns';
import dates      from './modules/dates';
import fbApiLog   from './modules/fb_api_log';
import jobs       from './modules/jobs';
import main       from './modules/main';
import proxy      from './modules/proxy';
import settings   from './modules/settings';
import tags       from './modules/tags';
import users      from './modules/users';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ads,
    adsets,
    adsmanager,
    bms,
    campaigns,
    dates,
    fbApiLog,
    main,
    jobs,
    bundles,
    accounts,
    settings,
    tags,
    users,
    proxy,
    cabs
  },
});