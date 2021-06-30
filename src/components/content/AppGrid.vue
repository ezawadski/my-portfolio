<template>
  <ion-grid>
    <ion-row>
      <ion-col v-for="entry in data" :key="entry" size="12" :size-sm="cardSize">
        <app-card
          :title="entry[cardData.title]"
          :imgUrl="entry[cardData.imgUrl]"
          :text="entry[cardData.text]"
        ></app-card>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script>
import { defineComponent } from 'vue';
import { IonGrid, IonRow, IonCol } from '@ionic/vue';

import AppCard from './AppCard.vue';

export default defineComponent({
  name: 'AppGrid',
  components: { IonGrid, IonRow, IonCol, AppCard },

  props: {
    cardSize: Number,
    cardData: {
      title: String,
      imgUrl: String,
      text: String
    },
    data: Array
  }
});
</script>

<style></style>
