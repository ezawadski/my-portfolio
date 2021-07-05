import { defineComponent } from 'vue';
import { IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton } from '@ionic/vue';

export default defineComponent({
    name: 'AppHeader',
    components: {
        IonHeader,
        IonTitle,
        IonToolbar,
        IonButtons,
        IonMenuButton
    },
    props: {
        title: String
    }
});
