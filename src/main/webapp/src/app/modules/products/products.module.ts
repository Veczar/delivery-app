import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { OrdersViewModule } from 'src/app/modules/orders/orders-view.module';
import { NavbarModule } from 'src/app/shared/navbar/navbar.module';
import { PartnerReviewModule } from '../partner-review/partner-review.module';
import { PartnerModule } from '../partner/partner.module';
import { UserModule } from '../user/user.module';
import { AddProductFormComponent } from './add-product-form/add-product-form.component';
import { FilterPipe } from './filter.pipe';
import { PartnerProductsComponent } from './partner-products/partner-products.component';
import { ProductComponent } from './product/product.component';


@NgModule({
  declarations: [
    FilterPipe,
    PartnerProductsComponent,
    AddProductFormComponent,
    ProductComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    PartnerReviewModule,
    UserModule,
    OrdersViewModule,
    NavbarModule,
    PartnerModule
  ],
})
export class ProductsModule { }
