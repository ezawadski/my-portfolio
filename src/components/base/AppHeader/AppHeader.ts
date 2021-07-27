import { defineComponent } from 'vue';
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonBackButton,
  modalController
} from '@ionic/vue';

import AppLogin from '@/components/auth/AppLogin/AppLogin.vue';
import { Actions, Getters } from '@/store/types';

export default defineComponent({
  name: 'AppHeader',
  props: {
    title: String,
    isDetail: {
      type: Boolean,
      default: false
    },
    defaultHref: String
  },
  computed: {
    isAuthenticated(): boolean {
      return this.$store.getters[Getters.IS_AUTHENTICATED];
    }
  },
  methods: {
    async openSignIn() {
      const modal = await modalController.create({
        component: AppLogin
      });
      return modal.present();
    },
    signOut() {
      this.$store.dispatch(Actions.LOGOUT);
    }
  },
  components: {
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonBackButton
  }
});
