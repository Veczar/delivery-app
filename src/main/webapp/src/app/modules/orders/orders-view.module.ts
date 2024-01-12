import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrdersViewComponent } from './orders-view/orders-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartnerOrdersComponent } from './partner-orders/partner-orders.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { OrderCheckoutComponent } from './order-checkout/order-checkout.component';

@NgModule({
  declarations: [
    OrdersViewComponent,
    PartnerOrdersComponent,
    OrderCheckoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDatepickerModule, 
    MatNativeDateModule
  ],
  exports: [
    OrdersViewComponent,
  ]
})
export class OrdersViewModule { }
