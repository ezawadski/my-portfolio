import { defineComponent } from 'vue';
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonBackButton,
  popoverController,
  isPlatform
} from '@ionic/vue';
import { ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';

import HeaderDropdown from '../HeaderDropdown/HeaderDropdown.vue';

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
  setup() {
    return { ellipsisHorizontal, ellipsisVertical, isPlatform };
  },
  computed: {
    isMobile(): boolean {
      return isPlatform('mobile');
    }
  },
  methods: {
    async openDropdown(event: Event) {
      const popover = await popoverController.create({
        component: HeaderDropdown,
        event,
        translucent: true
      });
      return popover.present();
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
