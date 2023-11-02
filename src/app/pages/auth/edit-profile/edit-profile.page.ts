import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-profile',
  templateUrl: 'edit-profile.page.html',
  styleUrls: ['edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  editProfileForm: FormGroup;
  user: any; 
  userProfile: any;

  constructor(
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private authService: AuthService,
    private toastController : ToastController,
    private router: Router
    ) {
    this.editProfileForm = this.formBuilder.group({
      displayName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  async ngOnInit() {
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

        this.editProfileForm.patchValue({
          displayName: this.userProfile.displayName,
          email: this.userProfile.email,
          firstName: this.userProfile.firstName,
          lastName: this.userProfile.lastName,
        });
      });
  }  

  async onSubmit() {
    if (this.editProfileForm.valid) {
      const { displayName, email, firstName, lastName } = this.editProfileForm.value;
      try {
        await this.authService.updateProfile(displayName, email, firstName, lastName);
        const toast = await this.toastController.create({
          message: 'Profil mis à jour avec succès',
          duration: 5000,
          position: 'top',
          color: 'success',
        });
        toast.present();
        this.router.navigate(['/profil']);
      } catch (error) {
        const toast = await this.toastController.create({
          message: 'Erreur lors de la mise à jour du profil',
          duration: 5000,
          position: 'top',
          color: 'danger',
        });
        toast.present();
        console.error('Erreur lors de la mise à jour du profil :', error);
      }
    }
  }
  
}
