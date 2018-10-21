import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizationComponent } from './authorization.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {AuthorizationRoutingModule} from './authorization-routing.module';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
  AuthorizationComponent,
  LoginComponent,
  RegistrationComponent
  ],
  imports: [
    CommonModule,
    AuthorizationRoutingModule,
    RouterModule,
    SharedModule
  ]
})
export class AuthorizationModule {}
