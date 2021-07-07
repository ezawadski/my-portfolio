import { defineComponent, PropType } from 'vue';
import { pencil, trash } from 'ionicons/icons';

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
  methods: {
    editEntry(id: string) {
      this.$emit('editEntry', id);
    },
    deleteEntry(id: string) {
      this.$emit('deleteEntry', id);
    }
  },
  setup() {
    return { pencil, trash };
  }
});
