import { defineComponent, PropType } from 'vue';
import { IonSlides, IonSlide } from '@ionic/vue';

import { CardData } from '@/models/CardData.model';
import utils from '@/utils/utilities';

import AppCard from '../AppCard/AppCard.vue';

export default defineComponent({
  name: 'AppSlides',
  props: {
    cardData: Object as PropType<CardData>,
    data: Array
  },
  setup() {
    // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
    const slideOpts = {
      initialSlide: 1,
      speed: 400
    };
    const prettyPrint = utils.prettyPrint;
    return { slideOpts, prettyPrint };
  },
  methods: {
    editEntry(id: string) {
      this.$emit('editEntry', id);
    },
    deleteEntry(id: string) {
      this.$emit('deleteEntry', id);
    }
  },
  components: { IonSlides, IonSlide, AppCard }
});
