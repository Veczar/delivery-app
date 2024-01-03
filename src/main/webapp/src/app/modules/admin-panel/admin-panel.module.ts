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
import { UserSettingsComponent } from '../user/user-settings/user-settings.component';
import { UserModule } from '../user/user.module';


@NgModule({
  declarations: [
    AdminPanelComponent,
    AdminDashboardComponent,
    UserTableComponent,
    // UserSettingsComponent
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
  ],
})
export class AdminPanelModule { }
