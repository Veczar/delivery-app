import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './modules/auth/auth-guard';
import { LoginFormComponent } from './modules/auth/login-form/login-form.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { RegisterUserFormComponent } from './modules/auth/register-user-form/register-user-form.component';
import { AdminPanelComponent } from './modules/admin-panel/admin-panel.component';
import { AdminDashboardComponent } from './modules/admin-panel/admin-dashboard/admin-dashboard.component';
import { UserTableComponent } from './modules/admin-panel/user-table/user-table.component';
import { RegisterPartnerFormComponent } from './modules/auth/register-partner-form/register-partner-form.component';
<<<<<<< HEAD
import { RegisterCourierFormComponent } from './modules/auth/register-courier-form/register-courier-form.component';
=======
import { PartnerViewComponent } from './modules/partner-view/partner-view.component';

>>>>>>> 4a99dc4 (Partner city search + raw component)

const routes: Routes = [
  {path: '', component: FrontPageComponent, pathMatch: 'full'},
  {path: 'auth', component: LoginFormComponent},
  {path: 'register/user', component: RegisterUserFormComponent},
  {path: 'register/partner', component: RegisterPartnerFormComponent},
<<<<<<< HEAD
<<<<<<< HEAD
  {path: 'register/courier', component: RegisterCourierFormComponent},
=======
  {path:'partners/city', component: PartnerViewComponent},
>>>>>>> 4a99dc4 (Partner city search + raw component)
=======
  {path: 'partners/city', component: PartnerViewComponent},
>>>>>>> 3d9365d (filters html)
  {
    path: 'admin',
    component: AdminPanelComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: AdminDashboardComponent}, 
      { path: 'users', component: UserTableComponent }, 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
