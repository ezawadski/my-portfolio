import { defineComponent } from 'vue';
import {
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonCardHeader,
  IonText,
  IonImg,
  IonButtons
} from '@ionic/vue';
import { pencil, trash } from 'ionicons/icons';

import { Getters } from '@/store/types';

export default defineComponent({
  name: 'AppCard',
  props: {
    id: String,
    title: String,
    subtitle: String,
    imgUrl: String,
    text: String,
    date: String
  },
  computed: {
    isAuthenticated(): boolean {
      return this.$store.getters[Getters.IS_AUTHENTICATED];
    }
  },
  setup() {
    return { pencil, trash };
  },
  methods: {
    editEntry() {
      this.$emit('editEntry', this.id);
    },
    deleteEntry() {
      this.$emit('deleteEntry', this.id);
    }
  },
  components: {
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
    IonText,
    IonImg,
    IonButtons
  }
});
