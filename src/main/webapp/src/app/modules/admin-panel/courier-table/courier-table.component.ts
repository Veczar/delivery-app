import { Component } from '@angular/core';
import { DeliveryManDto } from 'src/app/shared/model/api-models';
import { ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CourierService } from '../../courier/courier.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
  selector: 'app-courier-table',
  templateUrl: './courier-table.component.html',
  styleUrls: ['./courier-table.component.scss']
})
export class CourierTableComponent {
  dataSource!: MatTableDataSource<DeliveryManDto>;
  courierForm!: FormGroup;
  editable = false;
  submitted: boolean = false;

    accountNumber?: string;
   displayedColumns: string[] = ['id', 'rating', 'user', 'workingArea', 'accountNumber'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private courierService: CourierService,
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) {
    this.loadData();
    this.initForm();
  }
  
  ngAfterViewInit(): void {
    // Check if exampleModal is defined before accessing nativeElement
    const exampleModal = document.getElementById('courierModal');
    if (exampleModal) {
      exampleModal.addEventListener('hidden.bs.modal', () => {
        // console.log('Modal exited or closed');
        this.loadData(); //refresh
        this.editable = false;
        this.courierForm.disable();
      });
    }
  }

  initForm(): void {
    this.courierForm = this.formBuilder.group({
      id: [''],
      user: [''],
      rating: ['',[Validators.required, Validators.min(0),Validators.max(5)]],
      workingArea: ['', [Validators.required, Validators.minLength(2)]],
      accountNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{26}$/) // Format numeru konta XX XXXX XXXX XXXX XXXX XXXX XXXX
        ]
      ],
    });

    this.courierForm.disable();
  }

  loadData(): void {
    this.courierService.getCouriers().subscribe(
      (users: DeliveryManDto[]) => {
        this.dataSource = new MatTableDataSource<DeliveryManDto>(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(users);
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.courierForm.controls;
  }

  click(courier: DeliveryManDto) {
    this.submitted = false;
    this.courierForm.patchValue(courier);
  }

  toggleEditMode(): void {
    Object.keys(this.courierForm.controls).forEach(key => {
      const control = this.courierForm.get(key);
      if (control) {
        control.setValue(control.value);
      }
    });

    if (this.courierForm.invalid) {
      console.log('wrong form');
      return;
    }

    this.editable = !this.editable;

    // Enable or disable form controls based on edit mode
    if (this.editable) {
      this.submitted = true;
      this.courierForm.enable();
    } 
    else {
      const courier: DeliveryManDto = this.courierForm.value;
      
      // saves changes
      console.log(courier);
      this.courierService.updateCourier(courier).subscribe(r => {
        this.toastService.show(`Courier ${r.id} edited`);
        // console.log(r)
      });

      this.submitted = false;
      this.courierForm.disable();
    }
  }

  deleteCourier(): void {
    this.courierService.deleteCourier(this.courierForm.value.id).subscribe(r => {
      console.log('user deleted');
      this.toastService.show(`Courier ${r.id} deleted`);
      // console.log(r)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
