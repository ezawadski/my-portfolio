import { defineComponent } from 'vue';
import { IonGrid, IonRow, IonCol } from '@ionic/vue';

import AppHeader from '@/components/base/AppHeader/AppHeader.vue';
import AppHeading from '@/components/content/AppHeading/AppHeading.vue';
import AppCard from '@/components/content/AppCard/AppCard.vue';

export default defineComponent({
    name: 'Home',
    components: {
        IonGrid,
        IonRow,
        IonCol,
        AppHeader,
        AppHeading,
        AppCard
    }
});
