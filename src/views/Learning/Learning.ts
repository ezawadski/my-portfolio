import { defineComponent } from 'vue';
import { IonGrid, IonRow, IonCol, modalController } from '@ionic/vue';

import { ColumnData } from '@/models/ColumnData.model';
import { CardData } from '@/models/CardData.model';
import { Course } from '@/models/Course.model';

import AppHeader from '@/components/base/AppHeader/AppHeader.vue';
import AppTable from '@/components/content/AppTable/AppTable.vue';
import AppGrid from '@/components/content/AppGrid/AppGrid.vue';
import AppSlides from '@/components/content/AppSlides/AppSlides.vue';
import ViewerSelector from '@/components/content/ViewerSelector/ViewerSelector.vue';
import CourseForm from '@/components/courses/CourseForm/CourseForm.vue';

import { Actions, Getters } from '@/store/types';

export default defineComponent({
  name: 'Learning',
  components: {
    IonGrid,
    IonRow,
    IonCol,
    AppHeader,
    AppTable,
    AppGrid,
    AppSlides,
    ViewerSelector
  },
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
      )
    };
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
          courseData: this.courseData.find(course => course.id === courseId),
          editMode: true
        }
      });
      modal.present();
    },
    deleteCourse(courseId: string) {
      this.$store.dispatch(Actions.DELETE_COURSE, courseId);
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
  created() {
    this.$store.dispatch(Actions.LOAD_COURSES);
  }
});
