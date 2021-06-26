<template>
  <ion-app>
    <ion-content>
      <side-menu-left></side-menu-left>

      <ion-router-outlet id="main" />
    </ion-content>
  </ion-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonApp, IonRouterOutlet } from '@ionic/vue';

import SideMenuLeft from '@/components/base/SideMenuLeft.vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    SideMenuLeft
  }
});
</script>

<style>
.ripple-parent {
  position: relative;
  overflow: hidden;
}
</style>
