import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddressDto, PartnerReviewReadDto } from 'src/app/shared/model/api-models';
import { PartnerReviewService } from '../../partner-review/partner-review.service';

@Component({
  selector: 'app-partner-review-table',
  templateUrl: './partner-review-table.component.html',
  styleUrls: ['./partner-review-table.component.scss']
})
export class PartnerReviewTableComponent {
  dataSource!: MatTableDataSource<PartnerReviewReadDto>;
  editable = false;
  submitted: boolean = false;

  displayedColumns: string[] = ['id', 'gradeInStars',  'description','date','partner','reviewer'];

  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private partnerReviewService: PartnerReviewService,
  ) {
    this.loadData();
    
  }

  loadData(): void {
    
    this.partnerReviewService.getReviews().subscribe(
      (reviews: PartnerReviewReadDto[]) => {
        this.dataSource = new MatTableDataSource<PartnerReviewReadDto>(reviews);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(reviews);
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
