import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { RegisterDeliveryManDto,RegisterResponseDto } from 'src/app/shared/model/api-models';
import { ToastService } from 'src/app/shared/toast/toast.service';


@Component({
  selector: 'app-register-courier-form',
  templateUrl: './register-courier-form.component.html',
  styleUrls: ['./register-courier-form.component.scss']
})
export class RegisterCourierFormComponent implements OnInit {


  courierForm: FormGroup = new FormGroup({
    //User data
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    telephoneNumber: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),

    //workingArea data
    workingArea: new FormControl(''),
    accountNumber: new FormControl(''),
  });
  submitted = false;
  wrongEmail: boolean = false;
  phonePrefixes = ['+48 PL','+355 AL','+376 AD','+43 AT','+375 BY','+32 BE','+387 BA','+359 BG','+385 HR','+357 CY',
  '+420 CZ','+45 DK','+372 EE','+358 FI','+33 FR','+49 DE','+30 GR','+36 HU','+354 IS','+353 IE','+39 IT','+383 XK',
  '+371 LV','+423 LI','+370 LT','+352 LU','+356 MT'];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.courierForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2),
        Validators.pattern(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/)]],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/)
        ]
      ],
      numpref: ['+48 PL', Validators.required],
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
      ],
      workingArea: ['', [Validators.required, Validators.minLength(2)]],
      accountNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{26}$/) // Format numeru konta XX XXXX XXXX XXXX XXXX XXXX XXXX
        ]
      ],
    });
  }

  removeAfterSpace(input: string): string {
    const indexOfSpace = input.indexOf(' ');

    if (indexOfSpace !== -1) {
      return input.substring(0, indexOfSpace);
    }

    return input;
  }

  onSubmit(){
    this.submitted = true;
    this.wrongEmail = false;

    Object.keys(this.courierForm.controls).forEach(key => {
      const control = this.courierForm.get(key);
      if (control) {
        control.setValue(control.value);
      }
    });

//     console.log(JSON.stringify(this.courierForm.value, null, 2));

    if (this.courierForm.invalid) {
      console.log('wrong form')
      return;
    }

     //console.log(JSON.stringify(this.courierForm.value, null, 2));
     //console.log(this.courierForm)

    this.authService.registerDeliveryMan(this.courierForm.value as RegisterDeliveryManDto).subscribe(
      (response: RegisterResponseDto) => {
        console.log('response:', response);

        if (response.message == 'success') {
          const combinedTelephoneNumber = `${this.removeAfterSpace(this.courierForm.value.numpref)} ${this.courierForm.value.telephoneNumber}`;

          this.courierForm.patchValue({
            telephoneNumber: combinedTelephoneNumber,
          });
          this.toastService.showSuccess('Account created, now log in');
          this.router.navigate(['']);
        }
        else {
          this.wrongEmail = true;
        }
        // console.log('wrong email?: ', this.wrongEmail)
      },
      (error) => {
        console.error('Error while registering a partner:', error);
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.courierForm.controls;
  }
}
