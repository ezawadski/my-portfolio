import { defineComponent, PropType } from 'vue';

import { ColumnData } from '@/models/ColumnData.model';

export default defineComponent({
    name: 'AppTable',
    props: {
        columns: Array as PropType<ColumnData[]>,
        data: Array
    }
});
