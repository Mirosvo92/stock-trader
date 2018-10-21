import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {AuthorizationComponent} from './authorization.component';
import {AuthGuard} from '../shared/services/auth-guard';


const routes: Routes = [
  {path: '', component: AuthorizationComponent, canActivate: [AuthGuard], children: [
      {path: 'login', component: LoginComponent},
      {path: 'login/registration', component: RegistrationComponent}
    ]}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorizationRoutingModule {}
