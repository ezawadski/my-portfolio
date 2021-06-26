<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <app-header title="Home"></app-header>
      <app-heading title="Full-Stack Developer"></app-heading>
      <ion-grid>
        <ion-row>
          <ion-col size-md="6" offset-md="3">
            <app-card title="Me!"></app-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonGrid, IonRow, IonCol } from '@ionic/vue';

import AppHeader from '@/components/base/AppHeader.vue';
import AppHeading from '@/components/content/AppHeading.vue';
import AppCard from '@/components/content/AppCard.vue';

export default defineComponent({
  name: 'Home',
  components: {
    IonGrid,
    IonRow,
    IonCol,
    AppHeader,
    AppHeading,
    AppCard
  }
});
</script>

<style scoped></style>
