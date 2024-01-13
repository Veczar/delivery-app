import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard, authCurierGuard, checkoutGuard, authPartnerGuard } from './shared/guards';
import { LoginFormComponent } from './modules/auth/login-form/login-form.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { RegisterUserFormComponent } from './modules/auth/register-user-form/register-user-form.component';
import { AdminPanelComponent } from './modules/admin-panel/admin-panel.component';
import { AdminDashboardComponent } from './modules/admin-panel/admin-dashboard/admin-dashboard.component';
import { UserTableComponent } from './modules/admin-panel/user-table/user-table.component';
import { RegisterPartnerFormComponent } from './modules/auth/register-partner-form/register-partner-form.component';
import { RegisterCourierFormComponent } from './modules/auth/register-courier-form/register-courier-form.component';
import { CourierTableComponent } from './modules/admin-panel/courier-table/courier-table.component';
import { PartnerProductsComponent } from './modules/products/partner-products/partner-products.component';
import { MyDeliveriesComponent } from './modules/orders/my-deliveries/my-deliveries.component';
import { PartnerTableComponent } from './modules/admin-panel/partner-table/partner-table.component';
import { PartnerOrdersComponent } from './modules/orders/partner-orders/partner-orders.component';
import { OrderCheckoutComponent } from './modules/orders/order-checkout/order-checkout.component';
import { PartnerViewComponent } from './modules/partner/partner-view/partner-view.component';
import { CityViewComponent } from './modules/partner/city-view/city-view.component';
import { AdminTableComponent } from './modules/admin-panel/admin-table/admin-table.component';

const routes: Routes = [
  {path: '', component: FrontPageComponent, pathMatch: 'full'},
  {path: 'auth', component: LoginFormComponent},
  {path: 'register/user', component: RegisterUserFormComponent},
  {path: 'register/partner', component: RegisterPartnerFormComponent},
  {path: 'register/courier', component: RegisterCourierFormComponent},
  {path: 'checkout', component: OrderCheckoutComponent, canActivate: [checkoutGuard] },
  {path: 'checkout/recurring', component: OrderCheckoutComponent, canActivate: [checkoutGuard]},
  {path: 'partner/:partner', component: PartnerProductsComponent},
  {
    path: 'partners',
    component: PartnerViewComponent,
    children: [
      {path: ':city', component: CityViewComponent},
    ]
  },
  {
    path: 'admin',
    component: AdminPanelComponent,
    canActivate: [authGuard],
    children: [
      { path: 'partners' , component: PartnerTableComponent},
      { path: 'dashboard', component: AdminDashboardComponent},
      { path: 'users', component: UserTableComponent },
      { path: 'couriers-table', component: CourierTableComponent },
      { path: 'admins-table', component:AdminTableComponent}
    ]
  },
  {path: 'courier/my-deliveries', component: MyDeliveriesComponent, canActivate: [authCurierGuard]},
  {path: 'courier/partner-orders', component: PartnerOrdersComponent, canActivate: [authPartnerGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
