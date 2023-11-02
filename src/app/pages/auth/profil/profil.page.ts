import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore'; 
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  user: any; 
  userProfile: any; 

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private authService: AuthService
    ) {}

  ngOnInit() {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.loadUserProfile(user.uid);
      } else {
        this.user = null;
        this.userProfile = null; 
      }
    });
  }

  loadUserProfile(uid: string) {
    this.firestore
      .collection('users')
      .doc(uid)
      .valueChanges()
      .subscribe((profile: any) => {
        this.userProfile = profile;
      });
  }

  async deconnexion() {
    try {
      await this.authService.signOut();
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  }
}
