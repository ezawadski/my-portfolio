<template>
  <ion-menu side="start" content-id="main">
    <ion-header>
      <ion-toolbar class="ion-activatable ripple-parent" color="primary">
        <ion-title @click="goTo('home')">
          Home
        </ion-title>
        <ion-ripple-effect></ion-ripple-effect>
        <ion-buttons slot="end">
          <ion-button @click="closeMenu">
            <ion-icon slot="icon-only" icon="close"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item
          class="ion-activatable ripple-parent"
          type="button"
          @click="goTo('learning')"
          >Learning
          <ion-ripple-effect></ion-ripple-effect>
        </ion-item>
        <ion-item>Menu Item</ion-item>
        <ion-item>Menu Item</ion-item>
        <ion-item>Menu Item</ion-item>
        <ion-item>Menu Item</ion-item>
      </ion-list>
    </ion-content>
  </ion-menu></template
>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenu,
  IonTitle,
  IonToolbar,
  menuController
} from '@ionic/vue';
import { RouteRecordName } from 'vue-router';

export default defineComponent({
  name: 'SideMenuLeft',
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonMenu,
    IonTitle,
    IonToolbar
  },
  methods: {
    closeMenu() {
      menuController.close();
    },
    goTo(routeName: RouteRecordName) {
      this.$router.push({ name: routeName });
      this.closeMenu();
    }
  }
});
</script>

<style scoped></style>
