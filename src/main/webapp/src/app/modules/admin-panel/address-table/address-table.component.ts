import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
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

  displayedColumns: string[] = ['id', 'city',  'street','postalCode', 'userId', 'userRole'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private http: HttpClient,
  ) {
    this.loadData();
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
    return this.http.get<AddressDto[]>(`http://localhost:8080/api/addresses`);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

