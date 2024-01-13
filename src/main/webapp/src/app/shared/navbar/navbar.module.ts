import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ComplaintModule } from 'src/app/modules/complaint/complaint.module';
import { OrdersViewModule } from 'src/app/modules/orders/orders-view.module';
import { ShoppingCartComponent } from 'src/app/shared/navbar/shopping-cart/shopping-cart.component';
import { UserModule } from 'src/app/modules/user/user.module';


@NgModule({
  declarations: [
    NavbarComponent,
    ShoppingCartComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    OrdersViewModule,
    UserModule,
    FormsModule,
    ComplaintModule,
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule { }
