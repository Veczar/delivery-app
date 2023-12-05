import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { RegisterUserDto } from 'src/app/shared/model/api-models';


function customNameValidator(control: FormControl) {
  // Implement your custom validation logic here

  const forbiddenName = 'admin'; // Example: Forbid the name 'admin'

  if (control.value && control.value.toLowerCase() === forbiddenName) {
    return { forbiddenName: true }; // Validation failed
  }

  return null; // Validation passed
}

@Component({
  selector: 'app-register-user-form',
  templateUrl: './register-user-form.component.html',
  styleUrls: ['./register-user-form.component.scss']
})
export class RegisterUserFormComponent implements OnInit {
  // user = {
  //   firstName: '',
  //   lastName: '',
  //   telephoneNumber: '',
  //   email: '',
  //   password: ''
  // };

  userForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    telephoneNumber: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  submitForm() {
    // Your form submission logic goes here
    console.log('Form submitted:', this.userForm);
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required, customNameValidator, Validators.minLength(2),]],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20)
        ]
      ],
      telephoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{9}$/),
        ]
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)
        ]
      ]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    console.log(JSON.stringify(this.userForm.value, null, 2));
    console.log(this.userForm)

    if (this.userForm.invalid) {
      return;
    }

    this.authService.registerUser(this.userForm.value as RegisterUserDto).subscribe(
      (response) => {
        console.log('response:', response);
      },
      (error) => {
        console.error('Error adding user:', error);
      }
    );
  }

  onReset(): void {
    this.submitted = false;
    this.userForm.reset();
  }

  // Access the form control in the template
  // get name() {
  //   return this.userForm.get('firstName');
  // }
}
