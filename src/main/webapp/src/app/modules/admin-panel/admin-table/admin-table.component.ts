import { Component } from '@angular/core';
import { UserDto } from 'src/app/shared/model/api-models';
import { ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../user/user.service';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/toast/toast.service';


@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.scss']
})
export class AdminTableComponent {

  dataSource!: MatTableDataSource<UserDto>;
  userForm!: FormGroup;
  editable = false;
  submitted: boolean = false;

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'telephone' ,'role'];


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) {
    this.loadData();
    this.initForm();
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
      role: [],
      addresses: this.formBuilder.array([this.createAddressFormGroup()])
    });

    this.userForm.disable();
  }

  createAddressFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      city: ['', [Validators.required, Validators.minLength(2)]],
      street: ['', [Validators.required, Validators.minLength(2)]],
      postalCode: [
        '',
        [
          Validators.required,Validators.minLength(6),Validators.maxLength(6),
          Validators.pattern(/^\d{2}-\d{3}$/) // Format kodu pocztowego XX-XXX
        ]
      ],
    });
  }

  get addresses(): FormArray {
    return this.userForm.get('addresses') as FormArray;
  }

  addAddress(): void {
    this.addresses.push(this.createAddressFormGroup());
  }

  loadData(): void {
    this.userService.getUsers().subscribe(
      (users: UserDto[]) => {
        const adminUsers = users.filter(user => user.role && user.role.name === 'ADMIN');
        this.dataSource = new MatTableDataSource<UserDto>(adminUsers);
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
    this.addresses.clear();
    user.addresses?.forEach(address => {
      this.addAddress();
    });
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
      console.log('wrong form');
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
        this.toastService.show(`User ${r.id} edited`);
        // console.log(r)
      });

      this.submitted = false;
      this.userForm.disable();
    }
  }

  deleteUser(): void {
    this.userService.deleteUser(this.userForm.value.id).subscribe(r => {
      console.log('user deleted');
      this.toastService.show(`User ${r.id} deleted`);
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
