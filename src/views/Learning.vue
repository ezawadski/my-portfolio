<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <app-header title="Learning"></app-header>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';

import AppHeader from '@/components/base/AppHeader.vue';

export default defineComponent({
  name: 'Learning',
  components: { AppHeader }
});
</script>

<style></style>
