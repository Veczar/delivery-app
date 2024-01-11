import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { FrontPageComponent } from './front-page/front-page.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/interceptors/auth-interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminPanelModule } from './modules/admin-panel/admin-panel.module';
import { PartnerModule } from './modules/partner-view/partner.module';
import { FilterPipe } from './shared/filter.pipe';

import { ToastComponent } from './shared/toast/toast-component/toast.component';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { UserSettingsComponent } from './modules/user/user-settings/user-settings.component';
import { OrdersViewModule } from 'src/app/modules/orders/orders-view.module';
import { PartnerProductsComponent } from './modules/products/partner-products/partner-products.component';
import { ProductsModule } from './modules/products/products.module';

import { MyDeliveriesComponent } from './modules/orders/my-deliveries/my-deliveries.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { OrderCheckoutComponent } from './modules/orders/order-checkout/order-checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent,
    ToastComponent,
    MyDeliveriesComponent,
    OrderCheckoutComponent,
  ],
  imports: [
    PartnerModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,

    UserModule,
    AuthModule,
    AdminPanelModule,
    ProductsModule,
    OrdersViewModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
