import { defineComponent } from 'vue';
import { IonGrid, IonRow, IonCol, modalController } from '@ionic/vue';
import { add } from 'ionicons/icons';

import { ColumnData } from '@/models/ColumnData.model';
import { CardData } from '@/models/CardData.model';
import { Project } from '@/models/Project.model';
import { Language } from '@/models/enums/Language.enum';

import AppHeader from '@/components/base/AppHeader/AppHeader.vue';
import AppTable from '@/components/content/AppTable/AppTable.vue';
import AppGrid from '@/components/content/AppGrid/AppGrid.vue';
import AppSlides from '@/components/content/AppSlides/AppSlides.vue';
import ViewerSelector from '@/components/content/ViewerSelector/ViewerSelector.vue';
import ProjectForm from '@/components/projects/ProjectForm/ProjectForm.vue';
import AppFilter from '@/components/content/AppFilter/AppFilter.vue';

import { Actions, Getters } from '@/store/types';

export default defineComponent({
  name: 'Learning',
  data() {
    return {
      viewingType: 'grid',
      columns: [
        { name: 'name', label: 'Name' },
        { name: 'languages', label: 'Languages' },
        { name: 'frameworks', label: 'Frameworks' },
        { name: 'dateCompleted', label: 'Date Completed' }
      ] as ColumnData[],
      cardData: new CardData(
        'id',
        'name',
        'languages',
        'coverImgUrl',
        'description',
        'dateCompleted'
      ),
      filteredData: [] as Project[]
    };
  },
  setup() {
    return { Language, add };
  },
  methods: {
    changeView(viewType: string) {
      this.viewingType = viewType;
    },
    async addProject() {
      const modal = await modalController.create({
        component: ProjectForm
      });
      modal.present();
    },
    async editProject(projectId: string) {
      const modal = await modalController.create({
        component: ProjectForm,
        componentProps: {
          projectData: this.$store.getters[Getters.PROJECT](projectId),
          editMode: true
        }
      });
      modal.present();
    },
    deleteProject(projectId: string) {
      this.$store.dispatch(Actions.DELETE_PROJECT, projectId);
    },
    onFilter(filters: string[]) {
      if (!filters.length) {
        this.filteredData = this.projectData;
      } else {
        this.filteredData = this.projectData.filter(entry =>
          entry.languages.some(lag => filters.includes(lag))
        );
      }
    }
  },
  computed: {
    projectData(): Project[] {
      return this.$store.getters[Getters.PROJECTS];
    },
    isAuthenticated(): boolean {
      return this.$store.getters[Getters.IS_AUTHENTICATED];
    }
  },
  watch: {
    projectData() {
      this.filteredData = this.projectData;
    }
  },
  created() {
    this.$store.dispatch(Actions.LOAD_PROJECTS);
  },
  components: {
    IonGrid,
    IonRow,
    IonCol,
    AppHeader,
    AppTable,
    AppGrid,
    AppSlides,
    ViewerSelector,
    AppFilter
  }
});
