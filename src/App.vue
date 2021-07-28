<template>
  <ion-app>
    <ion-content>
      <side-menu-left></side-menu-left>

      <ion-router-outlet id="main" />
      <ion-loading :is-open="isLoadingRef" :message="message"></ion-loading>
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
  data() {
    return {
      message: ''
    };
  },
  computed: {
    isLoading(): boolean {
      return this.$store.getters[Getters.IS_LOADING];
    }
  },
  watch: {
    isLoading() {
      this.setMessage();
      this.setSpinner(this.isLoading);
    }
  },
  methods: {
    setMessage() {
      const messages = [
        'Patience! Jeez...',
        'Just a minute, getting coffee...',
        'LET ME FINISH POOPING!'
      ];
      const selected = Math.floor(Math.random() * messages.length);
      this.message = messages[selected];
    }
  },
  created() {
    this.$store.dispatch(Actions.AUTO_LOGIN);
    this.$store.dispatch(Actions.LOAD_ABOUT);
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
