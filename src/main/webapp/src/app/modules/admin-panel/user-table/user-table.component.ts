import { Component, Renderer2 } from '@angular/core';
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
  userForm!: FormGroup;
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
    this.loadData();
    this.initForm();
  }
  
  ngAfterViewInit(): void {
    // Check if exampleModal is defined before accessing nativeElement
    const exampleModal = document.getElementById('userModal');
    if (exampleModal) {
      exampleModal.addEventListener('hidden.bs.modal', () => {
        // console.log('Modal exited or closed');
        this.loadData(); //refresh
      });
    }
  }

  initForm(): void {
    this.userForm = this.formBuilder.group({
      id: [''],
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

  loadData(): void {
    this.userService.getUserRoleUser().subscribe(
      (users: UserDto[]) => {
        this.dataSource = new MatTableDataSource<UserDto>(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(users);
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  click(user: UserDto) {
    this.submitted = false;
    this.userForm.patchValue(user);
    this.userForm.get('role')?.setValue(user.role?.id);
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
      // transform the role to be an object with id
      const roleId = this.userForm.value.role;
      const user: UserDto = this.userForm.value;
      user.role = { id: roleId };
      
      // saves changes
      console.log(user);
      this.userService.updateUser(user).subscribe(r => {
        console.log('user updated')
        // console.log(r)
      });

      this.submitted = false;
      this.userForm.disable();
    }
  }

  deleteUser(): void {
    this.userService.deleteUser(this.userForm.value.id).subscribe(r => {
      console.log('user deleted')
      this.loadData();
      // console.log(r)
    });
  }

  onExit(): void {
    this.loadData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
