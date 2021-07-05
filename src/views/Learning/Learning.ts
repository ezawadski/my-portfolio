import { defineComponent } from 'vue';
import { IonGrid, IonRow, IonCol } from '@ionic/vue';

import { ColumnData } from '@/models/ColumnData.model';
import { CardData } from '@/models/CardData.model';
import { Course } from '@/models/Course.model';

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
        ViewerSelector,
    },
    data() {
        return {
            viewingType: 'grid',
            columns: [
                { name: 'dateCompleted', label: 'Date Completed' },
                { name: 'name', label: 'Name' },
            ] as ColumnData[],
            cardData: new CardData('name', '', 'dateCompleted'),
        };
    },
    methods: {
        changeView(viewType: string) {
            this.viewingType = viewType;
        },
    },
    computed: {
        courseData(): Course[] {
            return this.$store.getters.courses;
        },
        isAuthenticated(): boolean {
            return this.$store.getters.isAuthenticated;
        },
    },
});
