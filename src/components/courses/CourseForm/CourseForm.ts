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
  IonDatetime,
  modalController
} from '@ionic/vue';
import { camera } from 'ionicons/icons';
import { cloneDeep } from 'lodash';

import { Course } from '@/models/Course.model';
import { Actions } from '@/store/types';

export default defineComponent({
  name: 'CourseForm',
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
    IonDatetime
  },
  props: {
    courseData: Course,
    editMode: { type: Boolean, default: false }
  },
  data() {
    return {
      formData: {
        id: '',
        name: '',
        dateCompleted: '',
        imgUrl: ''
      },
      imageFile: new File([], '')
    };
  },
  methods: {
    close() {
      modalController.dismiss();
    },
    getImage() {
      const fileInput = this.$refs['fileInput'] as HTMLFormElement;
      fileInput.click();
    },
    onFilePicked(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.files) {
        this.imageFile = target.files[0];
      }
    },
    async submit() {
      if (!this.formData.imgUrl && !this.imageFile.size) {
        console.log('error');
        return;
      }
      const course = new Course(
        this.formData.id,
        this.formData.name,
        this.formData.dateCompleted,
        this.formData.imgUrl
      );
      await this.$store.dispatch(
        this.editMode ? Actions.UPDATE_COURSE : Actions.CREATE_COURSE,
        { course, file: this.imageFile }
      );
      console.log('finished');
      this.close();
    }
  },
  setup() {
    return { camera };
  },
  created() {
    if (this.courseData) {
      this.formData = cloneDeep(this.courseData);
    }
  }
});
