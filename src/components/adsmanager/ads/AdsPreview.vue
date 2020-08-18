<template>
  <v-dialog
    v-if="preview.show"
    :value="preview.show"
    max-width="480"
    @click:outside="$emit('close')"
  >
    <v-card>
      <v-img
        :src="preview.src"
        style="width: 480; height: auto;"
      />
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          text
          @click="$emit('close')"
        >
          {{ $t('common.close') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'AdsPreview',

  props: {
    preview: {
      type: Object,
      default: () => ({
        show: false,
        src: ''
      })
    }
  }
};
</script>