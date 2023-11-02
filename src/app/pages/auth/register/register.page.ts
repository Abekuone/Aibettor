import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage {

  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      displayName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async register() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;

      try {
        const userCredential = await this.authService.singUp(userData);

        if (userCredential) {
          const toast = await this.toastController.create({
            message: 'Inscription réussie !',
            duration: 5000,
            position: 'top',
            color: 'success',
          });
          toast.present();
          this.router.navigate(['/login']);
        } else {
          const toast  = await this.toastController.create({
            message: 'Erreur dans le formulaire !',
            duration: 5000,
            position: 'top',
            color: 'danger',
          });
          toast.present();
        }
      } catch (error) {
        const toast  = await this.toastController.create({
          message: 'Erreur dans le formulaire !',
          duration: 5000,
          position: 'top',
          color: 'danger',
        });
        toast.present();
      }
    }
  }
}