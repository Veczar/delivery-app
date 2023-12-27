import { Component, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { UserDto } from 'src/app/shared/model/api-models';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent {

  userForm!: FormGroup;
  editable = false;
  submitted: boolean = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
  ) {
    this.initForm();
    this.userService.getUser(parseInt(localStorage.getItem('id') as string)).subscribe(user => {
      console.log(user);
      this.submitted = false;
      user.addresses?.forEach(address => {
        this.addAddress();
      });
      this.removeAddress(0); //one too much

      this.userForm.patchValue(user);
      this.userForm.get('role')?.setValue(user.role?.id);
      this.userForm.disable();
    })
  }

  addAddress(): void {
    this.addresses.push(this.createAddressFormGroup());
  }

  get addresses(): FormArray {
    return this.userForm.get('addresses') as FormArray;
  }

  removeAddress(index: number): void {
    this.addresses.removeAt(index);
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

    // this.userForm.disable();
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

  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  toggleEditMode(): void {
    console.log(this.userForm.value);
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
      // console.log(user);
      console.log('save changes');
      // this.userService.updateUser(user).subscribe(r => {
      //   console.log('user updated')
      //   // console.log(r)
      // });

      this.submitted = false;
      this.userForm.disable();
    }
  }
}
