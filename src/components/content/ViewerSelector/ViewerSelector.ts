import { defineComponent } from 'vue';
import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/vue';

export default defineComponent({
  name: 'ViewerSelector',
  components: { IonSegment, IonSegmentButton, IonLabel },
  props: {
    value: String
  },
  methods: {
    segmentChanged(event: CustomEvent) {
      this.$emit('viewSelected', event.detail.value);
    }
  }
});
