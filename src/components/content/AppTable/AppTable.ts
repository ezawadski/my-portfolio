import { defineComponent, PropType } from 'vue';
import { IonGrid, IonRow, IonCol, IonButtons } from '@ionic/vue';
import { pencil, trash } from 'ionicons/icons';

import utils from '@/utils/utilities';
import { Getters } from '@/store/types';
import { ColumnData } from '@/models/ColumnData.model';

export default defineComponent({
  name: 'AppTable',
  props: {
    columns: Array as PropType<ColumnData[]>,
    data: Array
  },
  computed: {
    isAuthenticated(): boolean {
      return this.$store.getters[Getters.IS_AUTHENTICATED];
    }
  },
  setup() {
    const prettyPrint = utils.prettyPrint;
    return { pencil, trash, prettyPrint };
  },
  methods: {
    editEntry(id: string) {
      this.$emit('editEntry', id);
    },
    deleteEntry(id: string) {
      this.$emit('deleteEntry', id);
    }
  },
  components: { IonGrid, IonRow, IonCol, IonButtons }
});
