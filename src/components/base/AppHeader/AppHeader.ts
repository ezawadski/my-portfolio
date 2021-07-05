import { defineComponent } from 'vue';
import {
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    modalController,
} from '@ionic/vue';

import AppLogin from '@/components/auth/AppLogin/AppLogin.vue';

export default defineComponent({
    name: 'AppHeader',
    components: {
        IonHeader,
        IonTitle,
        IonToolbar,
        IonButtons,
        IonMenuButton,
    },
    props: {
        title: String,
    },
    computed: {
        isAuthenticated(): boolean {
            return this.$store.getters.isAuthenticated;
        },
    },
    methods: {
        async openSignIn() {
            const modal = await modalController.create({
                component: AppLogin,
            });
            return modal.present();
        },
        signOut() {
            this.$store.dispatch('logout');
        },
    },
});
