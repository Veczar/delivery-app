import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { RegisterPartnerDto,RegisterResponseDto } from 'src/app/shared/model/api-models';


function customNameValidator(control: FormControl) {
  // Implement your custom validation logic here

  const forbiddenName = 'admin'; // Example: Forbid the name 'admin'

  if (control.value && control.value.toLowerCase() === forbiddenName) {
    return { forbiddenName: true }; // Validation failed
  }

  return null; // Validation passed
}

@Component({
  selector: 'app-register-partner-form',
  templateUrl: './register-partner-form.component.html',
  styleUrls: ['./register-partner-form.component.scss']
})
export class RegisterPartnerFormComponent implements OnInit {


  partnerForm: FormGroup = new FormGroup({
    //User data
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    telephoneNumber: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),

    //Partner data
    name: new FormControl(''),
    accountNumber: new FormControl(''),
    contactNumber: new FormControl(''),
    category: new FormControl(''),
    address: new FormGroup({
      city: new FormControl(''),
      postalCode: new FormControl(''),
      street: new FormControl(''),
    }),
    
  });
  submitted = false;
  wrongEmail: boolean = false;
  honePrefixes = ['+48', '+355', '+376', '+43', '+375', '+32', /* ... other prefixes ... */];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.partnerForm = this.formBuilder.group({
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
      ],
      name: ['', [Validators.required, Validators.minLength(2)]],
      accountNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{26}$/) // Format numeru konta XX XXXX XXXX XXXX XXXX XXXX XXXX
        ]
      ],
      numpref: ['', Validators.required],
      conpref: ['', Validators.required],
      contactNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{9}$/),
        ]
      ],category:['', [Validators.required]],

      address: this.formBuilder.group({
        city: ['', [Validators.required, Validators.minLength(2)]],
        postalCode: [
          '',
          [
            Validators.required,
            Validators.pattern(/^\d{2}-\d{3}$/) // Format kodu pocztowego XX-XXX
          ]
        ],
        street: ['', [Validators.required, Validators.minLength(2)]],
      }),
    });
  }

  onSubmit(){
    this.submitted = true;
    this.wrongEmail = false;
    console.log(JSON.stringify(this.partnerForm.value, null, 2));
    console.log(this.partnerForm)

    

    Object.keys(this.partnerForm.controls).forEach(key => {
      const control = this.partnerForm.get(key);
      if (control) {
        control.setValue(control.value);
      }
    });

    if (this.partnerForm.invalid) {
      console.log('wrong form')
      return;
    }

    const combinedContactNumber = `${this.partnerForm.value.conpref} ${this.partnerForm.value.contactNumber}`;
    const combinedTelephoneNumber = `${this.partnerForm.value.numpref} ${this.partnerForm.value.telephoneNumber}`;
  
    // Update the form values with combined numbers
    this.partnerForm.patchValue({
      contactNumber: combinedContactNumber,
      telephoneNumber: combinedTelephoneNumber,
    });

    console.log(JSON.stringify(this.partnerForm.value, null, 2));
    console.log(this.partnerForm)
    


    this.authService.registerParnter(this.partnerForm.value as RegisterPartnerDto).subscribe(
      (response: RegisterResponseDto) => {
        console.log('response:', response);

        if (response.message == 'success') {
          console.log('succesfully registered a user');
          //this.router.navigate(['']);
        }
        else {
          this.wrongEmail = true;
        }
        // console.log('wrong email?: ', this.wrongEmail)
      },
      (error) => {
        console.error('Error while registering a user:', error);
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.partnerForm.controls;
  }
  
  get addressForm(): FormGroup {
    return this.partnerForm.get('address') as FormGroup;
  }
}
