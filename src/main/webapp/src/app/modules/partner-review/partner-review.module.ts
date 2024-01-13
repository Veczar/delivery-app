import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnerReviewComponent } from './partner-review/partner-review.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PartnerReviewComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    PartnerReviewComponent
  ]
})
export class PartnerReviewModule { }
