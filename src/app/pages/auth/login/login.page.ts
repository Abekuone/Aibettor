import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async submitForm() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const isConnected = await this.authService.signIn(email, password);

      if (isConnected) {

        const toast = await this.toastController.create({
          message: 'Connexion réussie !',
          duration: 5000,
          position: 'top',
          color: 'success'
        });
        toast.present();
        this.router.navigate(['/profil']);
      } else {
        const toast = await this.toastController.create({
          message: 'Veuillez vérifier vos informations',
          duration: 5000,
          position: 'top',
          color: 'danger'
        });
        toast.present();
      }
    } else {
      
      const toast = await this.toastController.create({
        message: 'Veuillez remplir correctement le formulaire.',
        duration: 5000,
        position: 'top',
        color: 'danger'
      });
      toast.present();
    }
  }

}
