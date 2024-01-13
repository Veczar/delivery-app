import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { AdminPanelModule } from './modules/admin-panel/admin-panel.module';
import { AuthModule } from './modules/auth/auth.module';
import { ComplaintModule } from './modules/complaint/complaint.module';
import { MyDeliveriesComponent } from './modules/orders/my-deliveries/my-deliveries.component';
import { PartnerModule } from './modules/partner/partner.module';
import { ProductsModule } from './modules/products/products.module';
import { UserModule } from './modules/user/user.module';
import { AuthInterceptor } from './shared/interceptors/auth-interceptor.service';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { ToastComponent } from './shared/toast/toast-component/toast.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { NavbarModule } from './shared/navbar/navbar.module';
import { OrdersViewModule } from 'src/app/modules/orders/orders-view.module';
import { FooterModule } from './shared/footer/footer.module';

@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent,
    ToastComponent,
    MyDeliveriesComponent,
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
      DatePipe,
  ],
  bootstrap: [AppComponent],
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
    OrdersViewModule,
    ComplaintModule,
    RecurringOrdersModule
    ComplaintModule,
    PartnerModule,
    NavbarModule
  ],
})
export class AppModule { }
