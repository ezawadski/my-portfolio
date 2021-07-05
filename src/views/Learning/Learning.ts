import { defineComponent } from 'vue';
import { IonGrid, IonRow, IonCol } from '@ionic/vue';

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
            viewingType: 'table',
            columns: [
                { name: 'dateCompleted', label: 'Date Completed' },
                { name: 'courseName', label: 'Name' }
            ],
            cardData: { title: 'courseName', imgUrl: null, text: 'dateCompleted' },
            data: [
                { dateCompleted: '123', courseName: 'The Course' },
                { dateCompleted: '456', courseName: 'The Second Course' },
                { dateCompleted: '456', courseName: 'The Third Course' },
                { dateCompleted: '456', courseName: 'The Fourth Course' }
            ]
        };
    },
    methods: {
        changeView(viewType: string) {
            this.viewingType = viewType;
        }
    }
});
