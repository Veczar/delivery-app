import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { RouterModule } from '@angular/router';
import { AuthContentComponent } from './auth-content/auth-content.component';


@NgModule({
  declarations: [
    LoginFormComponent,
    AuthContentComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class AuthModule { }
