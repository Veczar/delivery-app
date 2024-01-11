import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnerViewComponent } from './partner-view/partner-view.component';
import { CityViewComponent } from './city-view/city-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AdminPanelModule } from '../admin-panel/admin-panel.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { FilterPipe } from 'src/app/shared/filter.pipe';


@NgModule({
  declarations: [
    PartnerViewComponent,
    CityViewComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    UserModule,
    AuthModule,
    AdminPanelModule
  ]
})
export class PartnerModule { }
