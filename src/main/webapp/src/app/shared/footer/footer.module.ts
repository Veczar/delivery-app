import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ComplaintModule } from 'src/app/modules/complaint/complaint.module';


@NgModule({
  declarations: [
    FooterComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ComplaintModule,
  ],
  exports: [
    FooterComponent
  ]
})
export class FooterModule { }
