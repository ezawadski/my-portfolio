import { About } from '@/models/About.model';
import { cloneDeep } from 'lodash';

import utils from '@/utils/utilities';

import firebaseApi from './firebase.api';
import storageApi from './storage.api';

const aboutImagesPath = 'img/about';
const resumesPath = 'resume';

export default {
  /**
   * Returns the about data from Firestore
   * @returns A promise with the about data
   */
  async loadAbout(): Promise<About> {
    const snap = await firebaseApi.firestore
      .collection('/abouts')
      .doc('default')
      .get();
    if (!snap.exists) {
      throw new Error('No About in Database');
    }
    return snap.data() as About;
  },

  /**
   * Creates or Updates the about in Firestore and Firebase Storage
   * @param about About to be created or updated
   * @param image Image to be saved with the about
   * @param resume Resume file to be saved with the about
   * @returns A void promise
   */
  async setAbout(about: About, image: File, resume: File): Promise<About> {
    const updatedAbout = cloneDeep(about);
    if (image.size) {
      updatedAbout.profileImgUrl = await storageApi.saveFile(
        aboutImagesPath,
        'profile-img',
        image
      );
    }
    if (resume.size) {
      updatedAbout.resumeUrl = await storageApi.saveFile(
        resumesPath,
        `resume-${new Date().toISOString()}`,
        resume
      );
    }
    const snap = await firebaseApi.firestore
      .collection('/abouts')
      .doc('default')
      .get();
    snap.ref.set(utils.prepareData(updatedAbout));
    return updatedAbout;
  }
};
