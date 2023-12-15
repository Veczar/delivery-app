import { Component } from '@angular/core';
import { UserDto } from 'src/app/shared/model/api-models';
import { ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../user/user.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent {
  dataSource!: MatTableDataSource<UserDto>;
  selectedUser: UserDto = {};
  userForm: FormGroup;
  editable = false;
  submitted: boolean = false;

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'role'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
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

    this.userForm = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/)
        ]
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/)

        ]
      ],
      telephoneNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(9),
          Validators.pattern(/^[0-9]+(?:[ -][0-9]+)*$/),
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(30),
        ]
      ],
      role: []
    });

    this.userForm.disable();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  click(user: UserDto) {
    this.submitted = false;
    this.userForm.patchValue(user);
    this.userForm.get('role')?.setValue(user.role?.id);
    console.log(this.userForm);
  }

  toggleEditMode(): void {
    Object.keys(this.userForm.controls).forEach(key => {
      const control = this.userForm.get(key);
      if (control) {
        control.setValue(control.value);
      }
    });

    if (this.userForm.invalid) {
      console.log('wrong form')
      return;
    }

    this.editable = !this.editable;

    // Enable or disable form controls based on edit mode
    if (this.editable) {
      this.submitted = true;
      this.userForm.enable();
    } 
    else {
      // saves changes
      console.log(JSON.stringify(this.userForm.value, null, 2));

      this.submitted = false;
      this.userForm.disable();
    }
  }

  deleteUser() {
    throw new Error('Method not implemented.');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
