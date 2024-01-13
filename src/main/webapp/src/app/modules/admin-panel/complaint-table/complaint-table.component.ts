import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ComplaintService } from 'src/app/modules/complaint/complaint.service';
import { ComplaintReadDto } from 'src/app/shared/model/api-models';

@Component({
  selector: 'app-complaint-table',
  templateUrl: './complaint-table.component.html',
  styleUrls: ['./complaint-table.component.scss']
})
export class ComplaintTableComponent {
  dataSource!: MatTableDataSource<ComplaintReadDto>;
  displayedColumns: string[] = ['id', 'creationDate', 'title', 'description', 'methodOfContact', 'userName', 'ususerEmail', 'userTelephoneNumber'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private complaintService: ComplaintService,
  ) {
    this.loadData();
  }

  loadData(): void {
    this.complaintService.getComplaintsRead().subscribe(
      (complaintReadDto: ComplaintReadDto[]) => {
        this.dataSource = new MatTableDataSource<ComplaintReadDto>(complaintReadDto);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(complaintReadDto);
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
  convertDate(timeStamp : number) :  String 
  {
    const date = new Date(timeStamp);

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
}
