<template>
  <ion-segment @ionChange="segmentChanged($event)" value="grid">
    <ion-segment-button value="table">
      <ion-label>Table</ion-label>
    </ion-segment-button>
    <ion-segment-button value="grid">
      <ion-label>Grid</ion-label>
    </ion-segment-button>
    <ion-segment-button value="slides">
      <ion-label>Slides</ion-label>
    </ion-segment-button>
  </ion-segment>
</template>

<script>
import { defineComponent } from 'vue';
import { IonSegment, IonSegmentButton } from '@ionic/vue';

export default defineComponent({
  name: 'ViewerSelector',
  components: { IonSegment, IonSegmentButton },
  props: {
    cardSize: Number,
    cardData: {
      title: String,
      imgUrl: String,
      text: String
    },
    data: Array
  },
  methods: {
    segmentChanged(event) {
      // console.log('Segment changed', event);
      this.$emit('viewSelected', event.detail.value);
    }
  }
});
</script>

<style></style>
