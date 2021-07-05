import { defineComponent } from 'vue';
import { IonSlides, IonSlide } from '@ionic/vue';

import { CardData } from '@/models/CardData.model';

import AppCard from '../AppCard/AppCard.vue';

export default defineComponent({
    name: 'AppSlides',
    components: { IonSlides, IonSlide, AppCard },
    props: {
        cardData: CardData,
        data: Array
    },
    setup() {
        // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
        const slideOpts = {
            initialSlide: 1,
            speed: 400
        };
        return { slideOpts };
    }
});
