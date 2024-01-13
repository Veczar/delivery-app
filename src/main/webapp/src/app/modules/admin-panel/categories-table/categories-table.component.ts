import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryDto, PartnerReviewReadDto } from 'src/app/shared/model/api-models';
import { PartnerReviewService } from '../../partner-review/partner-review.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss']
})
export class CategoriesTableComponent {
  dataSource!: MatTableDataSource<CategoryDto>;
  editable = false;
  submitted: boolean = false;

  displayedColumns: string[] = ['id', 'name',  'description'];

  
 
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private http: HttpClient
  ) {
    this.loadData();
    
  }

  loadData(): void {
    
    this.getCategories().subscribe(
      (categories: CategoryDto[]) => {
        this.dataSource = new MatTableDataSource<CategoryDto>(categories);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(categories);
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

  getCategories(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(`http://localhost:8080/api/categories`);
  }
}
