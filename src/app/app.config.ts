import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding, withHashLocation } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { routes } from './app.routes';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDj-fSKegrKwLvqu3hHCQDPbO3wf07kzHI",
  authDomain: "tfghector-d12c1.firebaseapp.com",
  projectId: "tfghector-d12c1",
  storageBucket: "tfghector-d12c1.appspot.com",
  messagingSenderId: "338847084470",
  appId: "1:338847084470:web:6105a4af295df4b2e41b17"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding()),
  importProvidersFrom(
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  )]

};
