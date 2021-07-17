import { defineComponent } from 'vue';
import {
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
  popoverController
} from '@ionic/vue';

export default defineComponent({
  name: 'AppFilterPopover',
  props: {
    filterTitle: {
      type: String,
      required: true
    },
    filterOptions: {
      type: Object,
      required: true
    },
    currentFilters: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const filters = Object.values(props.filterOptions).map(value => ({
      value,
      isChecked: props.currentFilters.includes(value)
    }));
    return { filters };
  },
  methods: {
    applyFilters() {
      const selected = this.filters.map(entry => {
        if (entry.isChecked) {
          return entry.value;
        }
      });
      popoverController.dismiss({ filters: selected });
    },
    clearFilters() {
      popoverController.dismiss({ filters: [] });
    }
  },
  components: { IonList, IonItem, IonLabel, IonCheckbox }
});
