<template>
  <ion-card>
    <ion-card-content>
      <h1>{{ title }}</h1>
    </ion-card-content>
  </ion-card>
</template>

<script>
import { defineComponent } from 'vue';
import { IonCard, IonCardContent } from '@ionic/vue';

export default defineComponent({
  name: 'AppHeading',
  components: { IonCard, IonCardContent },
  props: {
    title: String
  }
});
</script>

<style></style>
