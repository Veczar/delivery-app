import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './modules/auth/login-form/login-form.component';
import { FrontPageComponent } from './front-page/front-page.component';


const routes: Routes = [
  {path: '', component: FrontPageComponent, pathMatch: 'full'},
  {path: 'auth', component: LoginFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
