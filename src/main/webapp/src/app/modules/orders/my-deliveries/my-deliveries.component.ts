import { Component } from '@angular/core';
import { OrderReadDto, Status } from 'src/app/shared/model/api-models';
import { ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from '../order.service';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-my-deliveries',
  templateUrl: './my-deliveries.component.html',
  styleUrls: ['./my-deliveries.component.scss']
})

export class MyDeliveriesComponent {
  dataSource!: MatTableDataSource<OrderReadDto>;
  orderForm!: FormGroup;
  selectedStatus: string = 'inDelivery';
  filter: string = '';
  displayedColumns: string[] = ["id", 'addressStart', 'addressEnd', 'customerName', 'telephoneNumber', 
  'partner', "creationDate", "totalPrice", "tip"];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private authService: AuthService
  ) {
    this.loadData();
    this.initForm();     
  }
  
  ngAfterViewInit(): void {
    // Check if exampleModal is defined before accessing nativeElement
    const exampleModal = document.getElementById('orderModal');
    if (exampleModal) {
      exampleModal.addEventListener('hidden.bs.modal', () => {
        // console.log('Modal exited or closed');
        this.loadData(); //refresh
      });
    }
    //this.dataSource.filter = this.filter;
  }

  initForm(): void {
    this.orderForm = this.formBuilder.group({
      id: [''],
      addressStart: [''],
      addressEnd: ['']
    });
  }

  loadData(): void {
    this.orderService.getOrdersAssignedToCourier(this.authService.getLoggedUserEmail()).subscribe(
      (orders: OrderReadDto[]) => {
        this.dataSource = new MatTableDataSource<OrderReadDto>(orders);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        const oldFilterPredicate  = this.dataSource.filterPredicate;
        this.dataSource.filterPredicate = (data: OrderReadDto, filter: string) => {
          const filterValue = filter.substring(0,filter.lastIndexOf(" "));
          const type = filter.substring(filter.lastIndexOf(" ")+1);

          if (type == "null") {
            return data.deliveryManId == null && data.status === Status.readyForDelivery;
          }
          
          return oldFilterPredicate(data, filterValue) && data.status === type && data.deliveryManId != null;
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
    this.selectedStatus = "inDelivery";
    this.dataSource.filter = this.filter + " " + this.selectedStatus;
    this.displayedColumns = ["id", 'addressStart', 'addressEnd', 'customerName', 'telephoneNumber', 
    'partner', "creationDate", "totalPrice", "tip"];
  }

  showDone() {
    this.selectedStatus = "done";
    this.dataSource.filter = this.filter + " " + this.selectedStatus;
    this.displayedColumns = ["id", 'addressStart', 'addressEnd', 'customerName', 'telephoneNumber', 
    'partner', "creationDate", "completionDate", "distanceInKm", "totalPrice", "tip", "rating"];
  }

  showAssignableOrders() {
    this.selectedStatus =  "null";
    this.dataSource.filter = this.filter + " " + this.selectedStatus;
    this.displayedColumns = ["id", 'addressStart', 'addressEnd', 'customerName', 'telephoneNumber', 
    'partner', "creationDate", "distanceInKm", "totalPrice", "tip", "assignDelivery"];
  }

  click(order: OrderReadDto) {
    this.orderForm.patchValue(order);
  }

  assignDelivery(id : number)
  {
    this.orderService.assignDeliveryMan(id, Number(localStorage.getItem('id'))).subscribe()
    {
      this.toastService.showSuccess("Delivery man was assigned to order");
  
      //delay so database could make changes 
      (async () => { 
        await new Promise(f => setTimeout(f, 1000));
        this.loadData();
    })();
    };
  
  }

  setStatusDone(): void {
    Object.keys(this.orderForm.controls).forEach(key => {
      const control = this.orderForm.get(key);
      if (control) {
        control.setValue(control.value);
      }
    });

    if (this.orderForm.invalid) {
      console.log('wrong form');
      return;
    }
      const order: OrderReadDto = this.orderForm.value;
      
      // saves changes
      order.status = Status.done;
      console.log(order);
      this.orderService.setStatus(order).subscribe(r => {
              //delay so database could make changes 
      (async () => { 
        await new Promise(f => setTimeout(f, 1000));
        this.loadData();
    })();
        this.toastService.show(`Order ${r.id} satus was set to done`);
        // console.log(r)
      });
  }
}
