import { defineComponent } from 'vue';
import {
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonMenu,
    IonTitle,
    IonToolbar,
    menuController
} from '@ionic/vue';
import { RouteRecordName } from 'vue-router';

export default defineComponent({
    name: 'SideMenuLeft',
    components: {
        IonButtons,
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonMenu,
        IonTitle,
        IonToolbar
    },
    methods: {
        closeMenu() {
            menuController.close();
        },
        goTo(routeName: RouteRecordName) {
            this.$router.push({ name: routeName });
            this.closeMenu();
        }
    }
});
