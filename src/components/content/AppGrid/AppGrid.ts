import { defineComponent } from 'vue';
import { IonGrid, IonRow, IonCol } from '@ionic/vue';

import { CardData } from '@/models/CardData.model';

import AppCard from '../AppCard/AppCard.vue';

export default defineComponent({
    name: 'AppGrid',
    components: { IonGrid, IonRow, IonCol, AppCard },

    props: {
        cardSize: Number,
        cardData: CardData,
        data: Array
    }
});
