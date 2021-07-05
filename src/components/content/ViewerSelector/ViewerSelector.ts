import { defineComponent } from 'vue';
import { IonSegment, IonSegmentButton } from '@ionic/vue';

export default defineComponent({
    name: 'ViewerSelector',
    components: { IonSegment, IonSegmentButton },
    props: {
        value: String
    },
    methods: {
        segmentChanged(event: CustomEvent) {
            this.$emit('viewSelected', event.detail.value);
        }
    }
});
