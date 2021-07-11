import { defineComponent } from 'vue';
import {
  IonCard,
  IonCardContent,
  IonCardTitle,
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
    imgUrl: String,
    text: String
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
    editEntry(id: string) {
      this.$emit('editEntry', id);
    },
    deleteEntry(id: string) {
      this.$emit('deleteEntry', id);
    }
  },
  components: {
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonText,
    IonImg,
    IonButtons
  }
});
