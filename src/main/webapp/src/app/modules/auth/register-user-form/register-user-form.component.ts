import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { RegisterResponseDto, RegisterUserDto } from 'src/app/shared/model/api-models';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/toast/toast.service';

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

    address: new FormGroup({
      city: new FormControl(''),
      postalCode: new FormControl(''),
      street: new FormControl(''),
    }),
  });
  submitted = false;
  wrongEmail: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    
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
      ],

      address: this.formBuilder.group({
        city: ['', [Validators.required, Validators.minLength(2)]],
        postalCode: [
          '',
          [
            Validators.required,Validators.minLength(6),Validators.maxLength(6),
            Validators.pattern(/^\d{2}-\d{3}$/) // Format kodu pocztowego XX-XXX
          ]
        ],
        street: ['', [Validators.required, Validators.minLength(2)]],
      }),
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  get addressForm(): FormGroup {
    return this.userForm.get('address') as FormGroup;
  }

  formatPostalCode(event: any): void {

    const cleanedValue = event.target.value.replace(/-/g, '');

    if (/^\d+$/.test(cleanedValue)) {

      const formattedValue = cleanedValue.slice(0, 2) + '-' + cleanedValue.slice(2);
      this.addressForm.patchValue({ postalCode: formattedValue });

    } else {
      const newValue = cleanedValue.slice(0, -1);
      this.addressForm.patchValue({ postalCode: newValue });
    }
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
          this.toastService.showSuccess('Account created, you can now now log in');
          this.router.navigate(['']);
        }
        else {
          this.wrongEmail = true;
        }
      }
    );
  }

}
