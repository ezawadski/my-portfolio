import { defineComponent } from 'vue';
import { IonGrid, IonRow, IonCol } from '@ionic/vue';

import { CardData } from '@/models/CardData.model';

import AppCard from '../AppCard/AppCard.vue';

export default defineComponent({
  name: 'AppGrid',
  props: {
    cardSize: Number,
    cardData: CardData,
    data: Array
  },
  methods: {
    editEntry(id: string) {
      this.$emit('editEntry', id);
    },
    deleteEntry(id: string) {
      this.$emit('deleteEntry', id);
    }
  },
  components: { IonGrid, IonRow, IonCol, AppCard }
});
