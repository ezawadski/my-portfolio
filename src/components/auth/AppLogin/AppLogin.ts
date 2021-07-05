import { defineComponent } from 'vue';
import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonItem,
    IonLabel,
    IonInput,
    modalController,
} from '@ionic/vue';
import { eye, eyeOff } from 'ionicons/icons';

export default defineComponent({
    name: 'AppLogin',
    components: {
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        IonButtons,
        IonCard,
        IonCardContent,
        IonCardHeader,
        IonCardTitle,
        IonItem,
        IonLabel,
        IonInput,
    },
    data() {
        return {
            isEric: false,
            isSure: false,
            showPassword: false,
            email: '',
            password: '',
        };
    },
    methods: {
        close() {
            modalController.dismiss();
        },
        confirmIsEric() {
            this.isEric = true;
        },
        confirmIsSure() {
            this.isSure = true;
        },
        signin() {
            this.$store
                .dispatch('login', { email: this.email, password: this.password })
                .then(() => this.close());
        },
    },
    setup() {
        return { eye, eyeOff };
    },
});
