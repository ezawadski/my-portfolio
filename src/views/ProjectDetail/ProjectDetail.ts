import { defineComponent } from 'vue';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonButtons,
  IonItem,
  IonLabel,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  modalController
} from '@ionic/vue';
import { pencil, trash } from 'ionicons/icons';

import { CardData } from '@/models/CardData.model';
import { Project } from '@/models/Project.model';
import { Language } from '@/models/enums/Language.enum';
import utils from '@/utils/utilities';

import AppHeader from '@/components/base/AppHeader/AppHeader.vue';
import AppSlides from '@/components/content/AppSlides/AppSlides.vue';
import ProjectForm from '@/components/projects/ProjectForm/ProjectForm.vue';

import { Actions, Getters } from '@/store/types';

export default defineComponent({
  name: 'ProjectDetail',
  data() {
    return {
      cardData: new CardData(
        'id',
        'name',
        'languages',
        'imgUrl',
        'description',
        'dateCompleted'
      ),
      projectId: this.$route.params.projectId,
      slidesData: [] as { id: string; imgUrl: string }[]
    };
  },
  setup() {
    const prettyPrint = utils.prettyPrint;
    return { prettyPrint, Language, pencil, trash };
  },
  methods: {
    async editProject() {
      const modal = await modalController.create({
        component: ProjectForm,
        componentProps: {
          projectData: this.$store.getters[Getters.PROJECT](this.projectId),
          editMode: true
        }
      });
      modal.present();
    },
    deleteProject(projectId: string) {
      this.$store.dispatch(Actions.DELETE_PROJECT, projectId);
    }
  },
  computed: {
    projectData(): Project {
      return this.$store.getters[Getters.PROJECT](this.projectId);
    },
    isAuthenticated(): boolean {
      return this.$store.getters[Getters.IS_AUTHENTICATED];
    }
  },
  watch: {
    projectData() {
      this.slidesData = [{ id: '00', imgUrl: this.projectData.coverImgUrl }];
      Object.values(this.projectData.imgUrls).forEach((url, index) => {
        this.slidesData.push({ id: index.toString(), imgUrl: url });
      });
    }
  },
  created() {
    this.$store.dispatch(Actions.LOAD_PROJECTS);
  },
  components: {
    IonGrid,
    IonRow,
    IonCol,
    IonButtons,
    IonItem,
    IonLabel,
    IonText,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,

    AppHeader,
    AppSlides
  }
});
