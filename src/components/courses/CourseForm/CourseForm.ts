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
  IonDatetime,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  modalController
} from '@ionic/vue';
import { camera } from 'ionicons/icons';
import { cloneDeep } from 'lodash';
import moment from 'moment';

import { Course } from '@/models/Course.model';
import { SkillCategory } from '@/models/enums/SkillCategory.enum';
import { Actions } from '@/store/types';

export default defineComponent({
  name: 'CourseForm',
  props: {
    courseData: {
      type: Object as PropType<Course>,
      required: false
    },
    editMode: { type: Boolean, default: false }
  },
  data() {
    return {
      imageFile: new File([], '')
    };
  },
  setup(props) {
    const formData = props.courseData
      ? cloneDeep(props.courseData)
      : new Course();
    return { formData, camera, SkillCategory };
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
        alert('Missing Image');
        return;
      }
      const course = new Course(
        this.formData.id,
        this.formData.name,
        this.formData.organization,
        this.formData.description,
        this.formData.studyHours,
        moment(new Date(this.formData.dateCompleted).toISOString()).format(
          'YYYY-MMM-DD'
        ),
        this.formData.categories,
        this.formData.certificationLink,
        this.formData.certificationId,
        this.formData.imgUrl
      );
      await this.$store.dispatch(
        this.editMode ? Actions.UPDATE_COURSE : Actions.CREATE_COURSE,
        { course, image: this.imageFile }
      );
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
    IonDatetime,
    IonSelect,
    IonTextarea,
    IonSelectOption
  }
});
