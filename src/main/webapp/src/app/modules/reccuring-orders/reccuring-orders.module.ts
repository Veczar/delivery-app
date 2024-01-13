import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecurringOrdersComponent } from './recurring-orders/recurring-orders.component';


@NgModule({
  declarations: [
    RecurringOrdersComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RecurringOrdersComponent
  ]
})
export class RecurringOrdersModule { }
