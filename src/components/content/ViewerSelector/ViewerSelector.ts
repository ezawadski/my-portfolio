import { defineComponent } from 'vue';
import { IonSegment, IonSegmentButton } from '@ionic/vue';

export default defineComponent({
    name: 'ViewerSelector',
    components: { IonSegment, IonSegmentButton },
    methods: {
        segmentChanged(event: CustomEvent) {
            // console.log('Segment changed', event);
            this.$emit('viewSelected', event.detail.value);
        }
    }
});
