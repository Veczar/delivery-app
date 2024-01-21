import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderReadDto, Status } from 'src/app/shared/model/api-models';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-partner-orders',
  templateUrl: './partner-orders.component.html',
  styleUrls: ['./partner-orders.component.scss']
})
export class PartnerOrdersComponent {
  dataSource!: MatTableDataSource<OrderReadDto>;
  orderForm!: FormGroup;
  selectedStatus: string = Status.inPreparation;
  filter: string = '';
  displayedColumns: string[] = ["id", 'addressStart', 'addressEnd', 'firstName', 'lastName', 'telephoneNumber', 
  'deliveryManFirstName', 'deliveryManLastName', "creationDate", "totalPrice", "tip", "makeReadyForPickup"];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private orderService: OrderService,
    private toastService: ToastService,
  ) {
    this.loadData();
  }
  
  ngAfterViewInit(): void {
    // Check if exampleModal is defined before accessing nativeElement
    this.loadData();
  }

  loadData(): void {
    this.orderService.getOrdersAssignedToPartner(Number(localStorage.getItem('id'))).subscribe(
      (orders: OrderReadDto[]) => {
        this.dataSource = new MatTableDataSource<OrderReadDto>(orders);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        const oldFilterPredicate  = this.dataSource.filterPredicate;
        this.dataSource.filterPredicate = (data: OrderReadDto, filter: string) => {
          return oldFilterPredicate(data, filter.substring(0,filter.lastIndexOf(" "))) && data.status === filter.substring(filter.lastIndexOf(" ")+1);
         };
         this.dataSource.filter = this.filter + this.selectedStatus; 
        console.log(orders);
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.orderForm.controls;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim();
    this.filter = filterValue;
    this.dataSource.filter = this.filter + " " +this.selectedStatus;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showInDelivery() {
    this.selectedStatus = Status.inDelivery;
    this.dataSource.filter = this.filter + " " + this.selectedStatus;
    this.displayedColumns = ["id", 'addressStart', 'addressEnd', 'firstName', 'lastName', 'telephoneNumber', 
    'deliveryManFirstName', 'deliveryManLastName', "creationDate", "totalPrice", "tip"];
  }

  showInPreparation() {
    this.selectedStatus = Status.inPreparation;
    this.dataSource.filter = this.filter+ " " + this.selectedStatus;
    this.displayedColumns = ["id", 'addressStart', 'addressEnd', 'firstName', 'lastName', 'telephoneNumber', 
    'deliveryManFirstName', 'deliveryManLastName', "creationDate", "totalPrice", "tip", "makeReadyForPickup"];
  }
  
  showReadyForDelivery() {
    this.selectedStatus = Status.readyForDelivery;
    this.dataSource.filter = this.filter+ " " + this.selectedStatus;
    this.displayedColumns = ["id", 'addressStart', 'addressEnd', 'firstName', 'lastName', 'telephoneNumber', 
    'deliveryManFirstName', 'deliveryManLastName', "creationDate", "distanceInKm", "totalPrice", "tip"];
  }

  showDone() {
    this.selectedStatus = Status.done;
    this.dataSource.filter = this.filter + " " + this.selectedStatus;
    this.displayedColumns = ["id", 'addressStart', 'addressEnd', 'firstName', 'lastName', 'telephoneNumber', 
    'deliveryManFirstName', 'deliveryManLastName', "creationDate", "completionDate", "distanceInKm", "totalPrice", "tip",  "rating"];
  }

  setReadyForDelivery(id : number) {
    this.orderService.setStatusWithId(id, Status.readyForDelivery).subscribe()
    {
      this.toastService.showSuccess("Order was set as ready for delivery");

      //delay so database could make changes 
      setTimeout(() => {this.loadData()},1000);
    };
  }
  
  getRole(): string {
    return localStorage.getItem('role') || '';
  }
}
