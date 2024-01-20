import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderDto } from 'src/app/shared/model/api-models';
import { OrderService } from '../../orders/order.service';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss']
})
export class OrderTableComponent {
  dataSource!: MatTableDataSource<OrderDto>;
  editable = false;
  submitted: boolean = false;

  displayedColumns: string[] = ['id', 'addressStart',  'addressEnd','creationDate','completionDate','customer','courier'
        ,'distanceInKm','partner','rating','status','tip','totalPrice'];
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private orderService: OrderService,
  ) {
    this.loadData();
  }

  loadData(): void {
    
    this.orderService.getOrders().subscribe(
      (orders: OrderDto[]) => {
        this.dataSource = new MatTableDataSource<OrderDto>(orders);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(orders);
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
