import { Project } from '@/models/Project.model';
import { cloneDeep } from 'lodash';

import utils from '@/utils/utilities';

import firebaseApi from './firebase.api';
import storageApi from './storage.api';

const projectImagesPath = 'img/projects';

export default {
  /**
   * Returns all the projects in the projects collection in Firestore
   * @returns A promise with the array of projects
   */
  async loadProjects(): Promise<Project[]> {
    const snap = await firebaseApi.firestore.collection('/projects').get();
    if (snap.empty) {
      throw new Error('No Projects in Database');
    }
    return snap.docs.map(doc => doc.data() as Project);
  },

  /**
   * Create an ID for a new project in Firestore
   * @returns ID for a new project
   */
  createProjectId(): string {
    return firebaseApi.firestore.collection('/projects').doc().id;
  },

  /**
   * Creates or Updates the project in Firestore and Firebase Storage
   * @param project Project to be created or updated
   * @param coverImage Image to be saved as the projec cover image
   * @param images Array of images to be saved with the project
   * @returns A void promise
   */
  async setProject(
    project: Project,
    coverImage: File,
    images: File[]
  ): Promise<Project> {
    const updatedProject = cloneDeep(project);
    if (coverImage.size) {
      updatedProject.coverImgUrl = await storageApi.saveFile(
        projectImagesPath,
        project.id,
        coverImage
      );
    }
    await Promise.all(
      images.map(async image => {
        if (image.size) {
          updatedProject.imgUrls[image.name] = await storageApi.saveFile(
            projectImagesPath,
            `${project.id}-${image.name}`,
            image
          );
        }
      })
    );
    const snap = await firebaseApi.firestore
      .collection('/projects')
      .doc(updatedProject.id)
      .get();
    snap.ref.set(utils.prepareData(updatedProject));
    return updatedProject;
  },

  /**
   * Deletes a project in Firestore and it's image in Firebase Storage
   * @param project The project to be deleted
   * @returns A void promise
   */
  deleteProject(project: Project): Promise<void[]> {
    const imageIds = Object.keys(project.imgUrls).map(
      key => `${project.id}-${key}`
    );
    if (project.coverImgUrl) {
      imageIds.push(project.id);
    }
    const filePromises = imageIds.map(id =>
      storageApi.deleteFile(projectImagesPath, id)
    );
    const firestorePromise = firebaseApi.firestore
      .collection('/projects')
      .doc(project.id)
      .delete();

    return Promise.all([...filePromises, firestorePromise]);
  }
};
