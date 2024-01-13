import { Component } from '@angular/core';
import { RecurringOrdersService } from '../recurring-orders.service';
import { RecurringOrderDto } from 'src/app/shared/model/api-models';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
  selector: 'app-recurring-orders',
  templateUrl: './recurring-orders.component.html',
  styleUrls: ['./recurring-orders.component.scss']
})
export class RecurringOrdersComponent {
  recurringOrderDtoList : RecurringOrderDto[] = [];

  constructor(
    private recuringService: RecurringOrdersService,
    private toastService: ToastService,
  ) {
  }

  ngOnInit(): void {
    this.loadData();
  }
  loadData() : void
  {
    const id: number = Number(localStorage.getItem('id'));
    this.recuringService.getRecurringOrdersAssignedToUser(id).subscribe(recurringOrderDtoList => {
      this.recurringOrderDtoList = recurringOrderDtoList;});
    
  }

  convertDate(date? : Date) :  String 
  {
    if(date != null)
    {
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, 
      };
    
      const formatter = new Intl.DateTimeFormat('en-GB', options);
      return formatter.format(date);
    }
    return "";
  }

  delete(reccuringOrder : RecurringOrderDto) : void
  {
      this.recuringService.deleteRecurringOrder(reccuringOrder.id).subscribe(r =>
        {
          setTimeout(() => {this.loadData()},500);
          this.loadData();
          this.toastService.showInfo("Periodic order was removed");
        });
    
  }
}

