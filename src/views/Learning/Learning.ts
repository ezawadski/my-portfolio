import { defineComponent } from 'vue';
import { IonGrid, IonRow, IonCol, modalController } from '@ionic/vue';
import { add } from 'ionicons/icons';

import { ColumnData } from '@/models/ColumnData.model';
import { CardData } from '@/models/CardData.model';
import { Course } from '@/models/Course.model';
import { SkillCategory } from '@/models/enums/SkillCategory.enum';

import AppHeader from '@/components/base/AppHeader/AppHeader.vue';
import AppTable from '@/components/content/AppTable/AppTable.vue';
import AppGrid from '@/components/content/AppGrid/AppGrid.vue';
import AppSlides from '@/components/content/AppSlides/AppSlides.vue';
import ViewerSelector from '@/components/content/ViewerSelector/ViewerSelector.vue';
import CourseForm from '@/components/courses/CourseForm/CourseForm.vue';
import AppFilter from '@/components/content/AppFilter/AppFilter.vue';

import { Actions, Getters } from '@/store/types';

export default defineComponent({
  name: 'Learning',
  data() {
    return {
      viewingType: 'grid',
      columns: [
        { name: 'name', label: 'Name' },
        { name: 'organization', label: 'Organization' },
        { name: 'studyHours', label: 'Study Hours' },
        { name: 'dateCompleted', label: 'Date Completed' }
      ] as ColumnData[],
      cardData: new CardData(
        'id',
        'name',
        'organization',
        'imgUrl',
        'description',
        'dateCompleted'
      ),
      filteredData: [] as Course[]
    };
  },
  setup() {
    return { SkillCategory, add };
  },
  methods: {
    changeView(viewType: string) {
      this.viewingType = viewType;
    },
    async addCourse() {
      const modal = await modalController.create({
        component: CourseForm
      });
      modal.present();
    },
    async editCourse(courseId: string) {
      const modal = await modalController.create({
        component: CourseForm,
        componentProps: {
          courseData: this.$store.getters[Getters.COURSE](courseId),
          editMode: true
        }
      });
      modal.present();
    },
    deleteCourse(courseId: string) {
      this.$store.dispatch(Actions.DELETE_COURSE, courseId);
    },
    onFilter(filters: string[]) {
      if (!filters.length) {
        this.filteredData = this.courseData;
      } else {
        this.filteredData = this.courseData.filter(entry =>
          entry.categories.some(cat => filters.includes(cat))
        );
      }
    }
  },
  computed: {
    courseData(): Course[] {
      return this.$store.getters[Getters.COURSES];
    },
    isAuthenticated(): boolean {
      return this.$store.getters[Getters.IS_AUTHENTICATED];
    }
  },
  watch: {
    courseData() {
      this.filteredData = this.courseData;
    }
  },
  created() {
    this.$store.dispatch(Actions.LOAD_COURSES);
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
