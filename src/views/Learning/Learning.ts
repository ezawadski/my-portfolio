import { defineComponent } from 'vue';
import { IonGrid, IonRow, IonCol } from '@ionic/vue';

import { store } from '@/store';
import { ColumnData } from '@/models/ColumnData.model';
import { CardData } from '@/models/CardData.model';
import AppHeader from '@/components/base/AppHeader/AppHeader.vue';
import AppTable from '@/components/content/AppTable/AppTable.vue';
import AppGrid from '@/components/content/AppGrid/AppGrid.vue';
import AppSlides from '@/components/content/AppSlides/AppSlides.vue';
import ViewerSelector from '@/components/content/ViewerSelector/ViewerSelector.vue';

export default defineComponent({
    name: 'Learning',
    components: {
        IonGrid,
        IonRow,
        IonCol,
        AppHeader,
        AppTable,
        AppGrid,
        AppSlides,
        ViewerSelector
    },
    data() {
        return {
            viewingType: 'grid',
            columns: [
                { name: 'dateCompleted', label: 'Date Completed' },
                { name: 'name', label: 'Name' }
            ] as ColumnData[],
            cardData: { title: 'name', imgUrl: '', text: 'dateCompleted' } as CardData
        };
    },
    methods: {
        changeView(viewType: string) {
            this.viewingType = viewType;
        }
    },
    computed: {
        data() {
            return store.getters.courses;
        }
    }
});
