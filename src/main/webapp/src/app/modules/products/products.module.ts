import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter.pipe';
import { PartnerProductsComponent } from './partner-products/partner-products.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { UserModule } from '../user/user.module';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddProductFormComponent } from './add-product-form/add-product-form.component';
import { ProductComponent } from './product/product.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

@NgModule({
  declarations: [
    FilterPipe,
    PartnerProductsComponent,
    AddProductFormComponent,
    ProductComponent,
    ShoppingCartComponent
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

    UserModule,
  ]
})
export class ProductsModule { }
