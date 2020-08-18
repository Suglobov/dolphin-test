<template>
  <td>
    <div
      v-for="page in item.pages"
      :key="`account-${item.id}-page-${page.page_id}`"
    >
      <div class="d-flex align-center">
        <img
          :src="page.ava"
          style="width: 16px; height: 16px;"
          class="mr-1"
        >
        <a
          :href="`https://facebook.com/${page.page_id}`"
          target="_blank"
          style="font-size: 12px;"
        >
          {{ page.name }}
        </a>
      </div>
      <div style="font-size: 11px !important; color: gray">
        {{ page.page_id }}
      </div>
    </div>
  </td>
</template>

<script>
export default {
  name: 'AdsManagerAccountFanPagesCell',

  props: {
    item: {
      type: Object,
      default: () => ({
        id: 0,
        pages: []
      })
    }
  }
};
</script>