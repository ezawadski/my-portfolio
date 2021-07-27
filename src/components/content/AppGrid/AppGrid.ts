import { defineComponent, PropType } from 'vue';
import { IonGrid, IonRow, IonCol } from '@ionic/vue';

import { CardData } from '@/models/CardData.model';
import utils from '@/utils/utilities';

import AppCard from '../AppCard/AppCard.vue';

export default defineComponent({
  name: 'AppGrid',
  props: {
    cardSize: Number,
    cardData: Object as PropType<CardData>,
    data: Array,
    withActions: {
      type: Boolean,
      default: true
    },
    withDetail: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const prettyPrint = utils.prettyPrint;
    return { prettyPrint };
  },
  methods: {
    editEntry(id: string) {
      this.$emit('editEntry', id);
    },
    deleteEntry(id: string) {
      this.$emit('deleteEntry', id);
    },
    goToDetail(id: string) {
      this.$emit('goToDetail', id);
    }
  },
  components: { IonGrid, IonRow, IonCol, AppCard }
});
