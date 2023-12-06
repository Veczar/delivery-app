import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';


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
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    telephoneNumber: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),

    name: new FormControl(''),
    accountNumber: new FormControl(''),
    contactNumber: new FormControl(''),
    address: new FormControl(''),
    
  });
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
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
      ]
    });
  }
}
