import { defineComponent } from 'vue';
import {
  IonList,
  IonItem,
  IonLabel,
  modalController,
  popoverController
} from '@ionic/vue';

import AppLogin from '@/components/auth/AppLogin/AppLogin.vue';
import { Actions, Getters } from '@/store/types';

export default defineComponent({
  name: 'HeaderDropdown',
  computed: {
    isAuthenticated(): boolean {
      return this.$store.getters[Getters.IS_AUTHENTICATED];
    },
    isMobile(): boolean {
      return false;
    }
  },
  methods: {
    async openSignIn() {
      popoverController.dismiss();
      const modal = await modalController.create({
        component: AppLogin
      });
      return modal.present();
    },
    signOut() {
      popoverController.dismiss();
      this.$store.dispatch(Actions.LOGOUT);
    }
  },
  components: {
    IonList,
    IonItem,
    IonLabel
  }
});
