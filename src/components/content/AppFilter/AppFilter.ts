import { defineComponent } from 'vue';
import { popoverController } from '@ionic/vue';
import { funnel } from 'ionicons/icons';

import AppFilterDropdown from '../AppFilterDropdown/AppFilterDropdown.vue';

export default defineComponent({
  name: 'AppFilter',
  props: {
    filterTitle: {
      type: String,
      required: true
    },
    filterOptions: {
      type: Object,
      required: true
    }
  },
  setup() {
    return { funnel };
  },
  data() {
    return {
      currentFilters: [] as string[]
    };
  },
  methods: {
    async openFilters() {
      const popover = await popoverController.create({
        component: AppFilterDropdown,
        componentProps: {
          filterTitle: this.filterTitle,
          filterOptions: this.filterOptions,
          currentFilters: this.currentFilters
        },
        cssClass: 'filterPopover'
      });
      await popover.present();

      const { data } = await popover.onWillDismiss();
      if (data) {
        this.currentFilters = data.filters;
        this.filters(data.filters);
      }
    },
    filters(id: string) {
      this.$emit('filters', id);
    }
  },
  components: {}
});
