export default {
  methods: {
    clipboard( value ) {
      this.$clipboard( value );
      this.$message.success(
        'Скопировано',
        1,
      );
    }
  }
};