import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComplaintFormComponent } from 'src/app/modules/complaint/complaint-form/complaint-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ComplaintFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ComplaintFormComponent,
  ]
})
export class ComplaintModule{ }
