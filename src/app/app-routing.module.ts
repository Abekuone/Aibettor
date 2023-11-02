import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'profil',
    loadChildren: () => import('./pages/auth/profil/profil.module').then( m => m.ProfilPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./pages/auth/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'match-list',
    loadChildren: () => import('./pages/match/match-list/match-list.module').then( m => m.MatchListPageModule)
  },
  {
    path: 'match-details',
    loadChildren: () => import('./pages/match/match-detail/match-detail.module').then(m => m.MatchDetailPageModule)
  }  
   
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
