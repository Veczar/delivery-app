import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { AddressDto, UserDto } from 'src/app/shared/model/api-models';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-address-table',
  templateUrl: './address-table.component.html',
  styleUrls: ['./address-table.component.scss']
})
export class AddressTableComponent {
  dataSource!: MatTableDataSource<AddressDto>;
  addressForm!: FormGroup;
  editable = false;
  submitted: boolean = false;

  displayedColumns: string[] = ['id', 'city',  'street','postalCode'];


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private http: HttpClient,
  ) {
    this.loadData();
    this.initForm();
  }

  initForm(): void {
    this.addressForm = this.formBuilder.group({
      id: [''],
      city: ['', [Validators.required, Validators.minLength(2)]],
      postalCode: [
        '',
        [
          Validators.required,Validators.minLength(6),Validators.maxLength(6),
          Validators.pattern(/^\d{2}-\d{3}$/) // Format kodu pocztowego XX-XXX
        ]
      ],
      street: ['', [Validators.required, Validators.minLength(2)]
      ],
    });

    this.addressForm.disable();
  }

  loadData(): void {
    
    this.getAddresses().subscribe(
      (address: AddressDto[]) => {
        this.dataSource = new MatTableDataSource<AddressDto>(address);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(address);
      }
    );
  }

  getAddresses(): Observable<AddressDto[]> {
    return this.http.get<UserDto[]>(`http://localhost:8080/api/addresses`);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

