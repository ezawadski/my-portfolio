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

import SideMenuLeft from '@/components/base/SideMenuLeft/SideMenuLeft.vue';
import { Actions } from '@/store/types';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    SideMenuLeft
  },
  created() {
    this.$store.dispatch(Actions.AUTO_LOGIN);
  }
});
</script>

<style lang="scss">
.ripple-parent {
  position: relative;
  overflow: hidden;
}
</style>
