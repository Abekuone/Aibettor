import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, ToastController } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { FirestoreModule } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

const firebaseConfig = {
  apiKey: "AIzaSyAVu1JDPFcIgnHM0vRaM8A9HW-lGjDgLlg",
  authDomain: "aibettor-30854.firebaseapp.com",
  databaseURL: "https://aibettor-30854-default-rtdb.firebaseio.com",
  projectId: "aibettor-30854",
  storageBucket: "aibettor-30854.appspot.com",
  messagingSenderId: "773658031633",
  appId: "1:773658031633:web:dc2c864b5f151caa8ba3b0",
  measurementId: "G-WKCGS7R9MZ"
};


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    RouterModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FirestoreModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ToastController
],


  bootstrap: [AppComponent],
})
export class AppModule {}
