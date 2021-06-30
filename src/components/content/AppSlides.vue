<template>
  <ion-slides pager="true" :options="slideOpts">
    <ion-slide v-for="entry in data" :key="entry">
      <app-card
        :title="entry[cardData.title]"
        :imgUrl="entry[cardData.imgUrl]"
        :text="entry[cardData.text]"
      ></app-card>
    </ion-slide>
  </ion-slides>
</template>

<script>
import { defineComponent } from 'vue';
import { IonSlides, IonSlide } from '@ionic/vue';

import AppCard from './AppCard.vue';

export default defineComponent({
  name: 'AppSlides',
  components: { IonSlides, IonSlide, AppCard },
  props: {
    cardData: {
      title: String,
      imgUrl: String,
      text: String
    },
    data: Array
  },
  setup() {
    // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
    const slideOpts = {
      initialSlide: 1,
      speed: 400
    };
    return { slideOpts };
  }
});
</script>

<style></style>
