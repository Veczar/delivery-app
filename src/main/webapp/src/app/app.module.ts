import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { FrontPageComponent } from './front-page/front-page.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './modules/auth/auth-interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminPanelModule } from './modules/admin-panel/admin-panel.module';
import { PartnerViewComponent } from './modules/partner-view/partner-view.component';
import { CityViewComponent } from './modules/partner-view/city-view/city-view.component';
import { SearchViewComponent } from './modules/partner-view/search-view/search-view.component';



@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent,
    PartnerViewComponent,
    CityViewComponent,
    SearchViewComponent,
  ],
  imports: [
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
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
