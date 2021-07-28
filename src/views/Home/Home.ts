import { defineComponent } from 'vue';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonButtons,
  modalController
} from '@ionic/vue';
import { pencil } from 'ionicons/icons';

import { About } from '@/models/About.model';

import AppHeader from '@/components/base/AppHeader/AppHeader.vue';
import AppCard from '@/components/content/AppCard/AppCard.vue';
import AboutForm from '@/components/about/AboutForm/AboutForm.vue';

import { Getters } from '@/store/types';

export default defineComponent({
  name: 'Home',

  setup() {
    return { pencil };
  },

  computed: {
    aboutData(): About {
      return this.$store.getters[Getters.ABOUT];
    },
    isAuthenticated(): boolean {
      return this.$store.getters[Getters.IS_AUTHENTICATED];
    }
  },

  methods: {
    async openForm() {
      const modal = await modalController.create({
        component: AboutForm,
        componentProps: {
          aboutData: this.$store.getters[Getters.ABOUT]
        }
      });
      modal.present();
    }
  },

  components: {
    IonGrid,
    IonRow,
    IonCol,
    IonButtons,

    AppHeader,
    AppCard
  }
});
