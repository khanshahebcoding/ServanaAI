'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  if (!getApps().length) {
    let firebaseApp;
    // When deployed to Firebase App Hosting, the config is provided automatically.
    // In a local development environment, we fall back to the config object.
    if (process.env.NODE_ENV === 'production') {
      try {
        // In a production environment (like App Hosting), initialize without config.
        firebaseApp = initializeApp();
      } catch (e) {
        // This is a fallback for production-like environments that are not App Hosting.
        console.warn('Automatic Firebase initialization failed. Falling back to config object.', e);
        firebaseApp = initializeApp(firebaseConfig);
      }
    } else {
      // In a development environment, always use the config object.
      firebaseApp = initializeApp(firebaseConfig);
    }

    return getSdks(firebaseApp);
  }

  // If already initialized, return the SDKs with the already initialized App
  return getSdks(getApp());
}

export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp)
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
