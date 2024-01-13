import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RecurringOrderDto, ProductDto } from 'src/app/shared/model/api-models';
import { RecurringOrdersService } from '../../reccuring-orders/recurring-orders.service';

@Component({
  selector: 'app-reccuring-orders-table',
  templateUrl: './reccuring-orders-table.component.html',
  styleUrls: ['./reccuring-orders-table.component.scss']
})
export class ReccuringOrdersTableComponent {
  dataSource!: MatTableDataSource<RecurringOrderDto>;
  editable = false;
  submitted: boolean = false;

  displayedColumns: string[] = ['id', 'addressStart',  'addressEnd','customer','frequency','product','quantity','startDate'];
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private http: HttpClient,
    private recuringService: RecurringOrdersService,
  ) {
    this.loadData();
    
  }

  loadData(): void {
    
    this.recuringService.getRecurringOrders().subscribe(
      ( recurringOrder: RecurringOrderDto[]) => {
        this.dataSource = new MatTableDataSource<RecurringOrderDto>(recurringOrder);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(recurringOrder);
      }
    );
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
