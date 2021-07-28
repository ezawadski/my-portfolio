import { defineComponent, PropType } from 'vue';
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
  IonTextarea,
  modalController
} from '@ionic/vue';
import { camera, document } from 'ionicons/icons';
import { cloneDeep } from 'lodash';

import { About } from '@/models/About.model';
import { Actions } from '@/store/types';

export default defineComponent({
  name: 'AboutForm',
  props: {
    aboutData: {
      type: Object as PropType<About>,
      required: false
    }
  },
  data() {
    return {
      imageFile: new File([], ''),
      resumeFile: new File([], '')
    };
  },
  setup(props) {
    const formData = props.aboutData ? cloneDeep(props.aboutData) : new About();
    return { formData, camera, document };
  },
  methods: {
    close() {
      modalController.dismiss();
    },
    getImage() {
      const imageInput = this.$refs['imageInput'] as HTMLFormElement;
      imageInput.click();
    },
    onImagePicked(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.files) {
        this.imageFile = target.files[0];
      }
    },
    getFile() {
      const fileInput = this.$refs['fileInput'] as HTMLFormElement;
      fileInput.click();
    },
    onFilePicked(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.files) {
        this.resumeFile = target.files[0];
      }
    },
    async submit() {
      if (
        (!this.formData.profileImgUrl && !this.imageFile.size) ||
        (!this.formData.resumeUrl && !this.resumeFile.size)
      ) {
        console.log('error');
        return;
      }
      const about = new About(
        this.formData.name,
        this.formData.title,
        this.formData.headline,
        this.formData.lifeStory,
        this.formData.email,
        this.formData.linkedInUrl
      );
      await this.$store.dispatch(Actions.SAVE_ABOUT, {
        about,
        image: this.imageFile,
        resume: this.resumeFile
      });
      this.close();
    }
  },
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
    IonTextarea
  }
});
