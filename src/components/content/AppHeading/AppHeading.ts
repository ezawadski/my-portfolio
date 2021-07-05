import { defineComponent } from 'vue';
import { IonCard, IonCardContent } from '@ionic/vue';

export default defineComponent({
    name: 'AppHeading',
    components: { IonCard, IonCardContent },
    props: {
        title: String
    }
});
