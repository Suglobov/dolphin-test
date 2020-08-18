export default {
  name: '',
  objective: 'CONVERSIONS',
  pixel_event: 'LEAD',
  locales: [],
  geo: {
    countries: {
      included: [],
      excluded: [],
    },
    regions: {
      included: [],
      excluded: [],
    },
    cities: {
      included: [],
      excluded: [],
    },
    cities_radius: {
      included: {},
      excluded: {},
    }
  },
  auto_placement: true,
  placements: {
    facebook: {
      feed: false,
      instant_article: false,
      story: false,
      right_hand_column: false,
      search: false,
      marketplace: false,
      video_feeds: false,
    },
    instagram: {
      stream: false,
      story: false,
      explore: false,
    },
    messenger: {
      messenger_home: false,
      sponsored_messages: false,
      story: false,
    },
    audience_network: {
      classic: false,
      instream_video: false,
      rewarded_video: false,
    },
  },
  age: {
    min: 18,
    max: 65,
  },
  genders: {
    male: true,
    female: true,
  },
  devices: {
    types: {
      desktop: true,
      mobile: true,
    },
    mobile_os: 'all',
    mobile_os_versions: {
      android: {
        min: '2.0',
        max: '9.0',
      },
      ios: {
        min: '2.0',
        max: '13.0',
      },
    },
    mobile_devices: {
      android: {
        smartphones: true,
        tablets: true,
      },
      ios: {
        iphone: true,
        ipad: true,
        ipod: true,
      },
    },
  },
  headline: '',
  text: '',
};