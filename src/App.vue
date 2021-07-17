<template>
  <ion-app>
    <ion-content>
      <side-menu-left></side-menu-left>

      <ion-router-outlet id="main" />
      <ion-loading
        :is-open="isLoadingRef"
        message="Patience! Jeez..."
      ></ion-loading>
    </ion-content>
  </ion-app>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { IonApp, IonRouterOutlet, IonLoading } from '@ionic/vue';

import SideMenuLeft from '@/components/base/SideMenuLeft/SideMenuLeft.vue';
import { Actions, Getters } from '@/store/types';

export default defineComponent({
  name: 'App',
  setup() {
    const isLoadingRef = ref(false);
    const setSpinner = (state: boolean) => (isLoadingRef.value = state);
    return { isLoadingRef, setSpinner };
  },
  computed: {
    isLoading(): boolean {
      return this.$store.getters[Getters.IS_LOADING];
    }
  },
  watch: {
    isLoading() {
      this.setSpinner(this.isLoading);
    }
  },
  created() {
    this.$store.dispatch(Actions.AUTO_LOGIN);
  },
  components: {
    IonApp,
    IonRouterOutlet,
    IonLoading,
    SideMenuLeft
  }
});
</script>

<style lang="scss">
.ripple-parent {
  position: relative;
  overflow: hidden;
}

.filterPopover .popover-content {
  width: 280px;
}
</style>
