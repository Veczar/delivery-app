import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDto, UserReadDto } from 'src/app/shared/model/api-models';
import { ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent {
  dataSource!: MatTableDataSource<UserDto>;

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'role'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private userService: UserService
  ) {
    // console.log("users?: " + this.route.snapshot.url);

    this.userService.getUserRoleUser().subscribe(
      (users: UserDto[]) => {
        this.dataSource = new MatTableDataSource<UserDto>(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(users);
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

  click(row: UserDto) {
    console.log(row);
  }
}
