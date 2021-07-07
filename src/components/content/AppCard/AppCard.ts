import { defineComponent } from 'vue';
import { IonCard, IonCardContent, IonCardTitle, IonText } from '@ionic/vue';

export default defineComponent({
  name: 'AppCard',
  components: { IonCard, IonCardContent, IonCardTitle, IonText },
  props: {
    title: String,
    imgUrl: String,
    text: String
  }
});
