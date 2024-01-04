import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter.pipe';
import { PartnerProductsComponent } from './partner-products/partner-products.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { UserModule } from '../user/user.module';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    FilterPipe,
    PartnerProductsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,

    UserModule,
  ]
})
export class ProductsModule { }
