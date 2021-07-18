import { Course } from '@/models/Course.model';
import { cloneDeep } from 'lodash';

import utils from '@/utils/utilities';

import firebaseApi from './firebase.api';
import storageApi from './storage.api';

const courseImagesPath = 'img/courses';

export default {
  /**
   * Returns all the courses in the courses collection in Firestore
   * @returns A promise with the array of courses
   */
  async loadCourses(): Promise<Course[]> {
    const snap = await firebaseApi.firestore.collection('/courses').get();
    if (snap.empty) {
      throw new Error('No Courses in Database');
    }
    return snap.docs.map(doc => doc.data() as Course);
  },

  /**
   * Create an ID for a new course in Firestore
   * @returns ID for a new course
   */
  createCourseId(): string {
    return firebaseApi.firestore.collection('/courses').doc().id;
  },

  /**
   * Creates or Updates the course in Firestore and Firebase Storage
   * @param course Course to be created or updated
   * @param image Image to be saved with the course
   * @returns A void promise
   */
  async setCourse(course: Course, image: File): Promise<Course> {
    const updatedCourse = cloneDeep(course);
    if (image.size) {
      updatedCourse.imgUrl = await storageApi.saveFile(
        courseImagesPath,
        course.id,
        image
      );
    }
    const snap = await firebaseApi.firestore
      .collection('/courses')
      .doc(updatedCourse.id)
      .get();
    snap.ref.set(utils.prepareData(updatedCourse));
    return updatedCourse;
  },

  /**
   * Deletes a course in Firestore and it's image in Firebase Storage
   * @param courseId The ID for the course to be deleted
   * @returns A void promise
   */
  deleteCourse(courseId: string): Promise<void[]> {
    const filePromise = storageApi.deleteFile(courseImagesPath, courseId);
    const firestorePromise = firebaseApi.firestore
      .collection('/courses')
      .doc(courseId)
      .delete();

    return Promise.all([filePromise, firestorePromise]);
  }
};
