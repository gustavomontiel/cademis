import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PassrecoveryComponent } from './passrecovery/passrecovery.component';


const authRoutes: Routes = [
  {
    path: '', component: AuthComponent,
    data: {
      title: ''
    },
    children: [
      {
        path: 'login', component: LoginComponent, data: {
          title: 'Login'
        }
      },
      { path: 'register', component: RegisterComponent, data: {
        title: 'Crear cuenta'
      } },
      { path: 'passrecovery', component: PassrecoveryComponent, data: {
        title: 'Recuperar contraseña'
      } },
      { path: '', redirectTo: '/login', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
