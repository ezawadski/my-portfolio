<template>
  <ion-card>
    <ion-card-content>
      <ion-img :src="imgSrc"></ion-img>
      <ion-card-title>{{ title }}</ion-card-title>
      <ion-text>{{ text }}</ion-text>
    </ion-card-content>
  </ion-card>
</template>

<script>
import { defineComponent } from 'vue';
import { IonCard, IonCardContent, IonCardTitle, IonText } from '@ionic/vue';

export default defineComponent({
  name: 'AppHeading',
  components: { IonCard, IonCardContent, IonCardTitle, IonText },
  props: {
    title: String,
    imgSrc: String,
    text: String
  }
});
</script>

<style></style>
