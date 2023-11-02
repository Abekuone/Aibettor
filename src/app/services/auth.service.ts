import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { getDatabase, ref, DataSnapshot } from 'firebase/database';
import { get } from 'firebase/database';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {}

  async singUp(userData: any): Promise<firebase.default.auth.UserCredential | null> {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(
        userData.email,
        userData.password
      );
      
      const user = userCredential.user;

      await this.afs.collection('users').doc(user?.uid).set({
        displayName: userData.displayName,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        balance: 50000,
      });
      
      await user!.updateProfile({
        displayName: userData.firstName + ' ' + userData.lastName,
      });
  
      return userCredential;
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
      return null;
    }
  }

  signIn(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signOut(): Promise<void> {
    return this.afAuth.signOut();
  }

  async updateProfile(displayName: string, email: string, firstName: string, lastName: string): Promise<void> {
    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        await user.updateProfile({ displayName: displayName });
        await user.updateEmail(email);

        const userData: Partial<User> = {
          displayName: displayName,
          email: email,
          firstName: firstName,
          lastName: lastName,
        };

        await this.afs.collection('users').doc(user.uid).update(userData as User);
      }
    } catch (error) {
      throw error;
    }
  }


}
