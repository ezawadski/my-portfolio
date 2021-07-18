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
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonDatetime,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  modalController
} from '@ionic/vue';
import { camera, trash } from 'ionicons/icons';
import { cloneDeep } from 'lodash';
import moment from 'moment';

import { Project } from '@/models/Project.model';
import { Language } from '@/models/enums/Language.enum';
import { Framework } from '@/models/enums/Framework.enum';
import { Database } from '@/models/enums/Database.enum';
import { CloudProvider } from '@/models/enums/CloudProvider.enum';
import { Actions } from '@/store/types';

export default defineComponent({
  name: 'ProjectForm',
  props: {
    projectData: {
      type: Object as PropType<Project>,
      required: false
    },
    editMode: { type: Boolean, default: false }
  },
  data() {
    return {
      coverImageFile: new File([], ''),
      imageFiles: [] as File[]
    };
  },
  setup(props) {
    const formData = props.projectData
      ? cloneDeep(props.projectData)
      : new Project();
    return {
      formData,
      camera,
      trash,
      Language,
      Framework,
      Database,
      CloudProvider
    };
  },
  methods: {
    close() {
      modalController.dismiss();
    },
    getCoverImage() {
      const coverFileInput = this.$refs['coverFileInput'] as HTMLFormElement;
      coverFileInput.click();
    },
    onCoverFilePicked(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.files) {
        this.coverImageFile = target.files[0];
      }
    },
    getImage() {
      const fileInput = this.$refs['fileInput'] as HTMLFormElement;
      fileInput.click();
    },
    onFilePicked(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.files) {
        this.imageFiles.push(target.files[0]);
      }
    },
    async submit() {
      const project = new Project(
        this.formData.id,
        this.formData.name,
        this.formData.description,
        this.formData.dateCompleted
          ? moment(new Date(this.formData.dateCompleted).toISOString()).format(
              'YYYY-MMM-DD'
            )
          : '',
        this.formData.languages,
        this.formData.frameworks,
        this.formData.databases,
        this.formData.cloudProviders,
        this.formData.coverImgUrl,
        this.formData.imgUrls
      );
      await this.$store.dispatch(
        this.editMode ? Actions.UPDATE_PROJECT : Actions.CREATE_PROJECT,
        { project, coverImage: this.coverImageFile, images: this.imageFiles }
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
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonDatetime,
    IonSelect,
    IonTextarea,
    IonSelectOption
  }
});
