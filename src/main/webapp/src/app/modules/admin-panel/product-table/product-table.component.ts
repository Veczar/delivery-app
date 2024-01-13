import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryDto, ProductDto } from 'src/app/shared/model/api-models';
import { ProductsService } from '../../products/products.service';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent {
  dataSource!: MatTableDataSource<ProductDto>;
  editable = false;
  submitted: boolean = false;

  displayedColumns: string[] = ['id', 'name',  'description','price','categories','owner','onSale'];
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private http: HttpClient,
    private productsService: ProductsService,
  ) {
    this.loadData();
    
  }

  loadData(): void {
    
    this.productsService.getProducts().subscribe(
      (products: ProductDto[]) => {
        this.dataSource = new MatTableDataSource<ProductDto>(products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(products);
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
