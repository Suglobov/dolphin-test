export default {
  methods: {
    apiError( response ) {
      const h = this.$createElement;
      this.$error({
        title: 'Произошла ошибка',
        content: h('div', {}, [
          h('p', 'Передайте текст ниже разработчику:'),
          h('p', JSON.stringify(response.data)),
        ]),
      });
    }
  }
};