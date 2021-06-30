<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <app-header title="Learning"></app-header>
      <viewer-selector @viewSelected="changeView"></viewer-selector>
      <ion-grid>
        <ion-row v-if="viewingType === 'table'">
          <ion-col size-md="6" offset-md="3">
            <app-table :columns="columns" :data="data"></app-table>
          </ion-col>
        </ion-row>
        <ion-row v-if="viewingType === 'grid'">
          <ion-col>
            <app-grid
              :cardData="cardData"
              :cardSize="3"
              :data="data"
            ></app-grid>
          </ion-col>
        </ion-row>
        <ion-row v-if="viewingType === 'slides'">
          <ion-col>
            <app-slides :cardData="cardData" :data="data"></app-slides>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonGrid, IonRow, IonCol } from '@ionic/vue';

import AppHeader from '@/components/base/AppHeader.vue';
import AppTable from '@/components/content/AppTable.vue';
import AppGrid from '@/components/content/AppGrid.vue';
import AppSlides from '@/components/content/AppSlides.vue';
import ViewerSelector from '@/components/content/ViewerSelector.vue';

export default defineComponent({
  name: 'Learning',
  components: {
    IonGrid,
    IonRow,
    IonCol,
    AppHeader,
    AppTable,
    AppGrid,
    AppSlides,
    ViewerSelector
  },
  data() {
    return {
      viewingType: 'table',
      columns: [
        { name: 'dateCompleted', label: 'Date Completed' },
        { name: 'courseName', label: 'Name' }
      ],
      cardData: { title: 'courseName', imgUrl: null, text: 'dateCompleted' },
      data: [
        { dateCompleted: '123', courseName: 'The Course' },
        { dateCompleted: '456', courseName: 'The Second Course' },
        { dateCompleted: '456', courseName: 'The Third Course' },
        { dateCompleted: '456', courseName: 'The Fourth Course' }
      ]
    };
  },
  methods: {
    changeView(viewType) {
      this.viewingType = viewType;
    }
  }
});
</script>

<style></style>
