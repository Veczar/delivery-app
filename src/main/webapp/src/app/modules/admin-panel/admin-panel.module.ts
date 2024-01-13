import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserTableComponent } from './user-table/user-table.component';
import { AdminPanelComponent } from './admin-panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourierTableComponent } from './courier-table/courier-table.component';
import { UserModule } from '../user/user.module';
import { PartnerTableComponent } from './partner-table/partner-table.component';
import { AdminTableComponent } from './admin-table/admin-table.component';
import { AddressTableComponent } from './address-table/address-table.component';
import { PartnerReviewTableComponent } from './partner-review-table/partner-review-table.component';
import { CategoriesTableComponent } from './categories-table/categories-table.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { OrderTableComponent } from './order-table/order-table.component';


@NgModule({
  declarations: [
    AdminPanelComponent,
    AdminDashboardComponent,
    UserTableComponent,
    CourierTableComponent,
    PartnerTableComponent,
    AdminTableComponent,
    AddressTableComponent,
    PartnerReviewTableComponent,
    CategoriesTableComponent,
    ProductTableComponent,
    OrderTableComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    UserModule
  ]
})
export class AdminPanelModule { }
