import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterUserFormComponent } from './register-user-form/register-user-form.component';
import { RegisterPartnerFormComponent } from './register-partner-form/register-partner-form.component';
import { RegisterCourierFormComponent } from './register-courier-form/register-courier-form.component';
@NgModule({
  declarations: [
    LoginFormComponent,
    RegisterUserFormComponent,
    RegisterPartnerFormComponent,
    RegisterCourierFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
