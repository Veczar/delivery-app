import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { RegisterResponseDto, RegisterUserDto } from 'src/app/shared/model/api-models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user-form',
  templateUrl: './register-user-form.component.html',
  styleUrls: ['./register-user-form.component.scss']
})
export class RegisterUserFormComponent implements OnInit {

  userForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    telephoneNumber: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;
  wrongEmail: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
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
          Validators.pattern(/^\d{9}$/),
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
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25)
        ]
      ]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.wrongEmail = false;
    // console.log(JSON.stringify(this.userForm.value, null, 2));
    // console.log(this.userForm)

    // Manually trigger change detection - this solves the validation styling problem
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

    this.authService.registerUser(this.userForm.value as RegisterUserDto).subscribe(
      (response: RegisterResponseDto) => {
        console.log('response:', response);

        if (response.message == 'success') {
          console.log('succesfully registered a user');
          this.router.navigate(['']);
        }
        else {
          this.wrongEmail = true;
        }
      },
      (error) => {
        console.error('Error while registering a user:', error);
      }
    );
  }

}
