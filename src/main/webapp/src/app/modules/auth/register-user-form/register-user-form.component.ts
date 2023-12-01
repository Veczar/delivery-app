import { Component } from '@angular/core';

@Component({
  selector: 'app-register-user-form',
  templateUrl: './register-user-form.component.html',
  styleUrls: ['./register-user-form.component.scss']
})
export class RegisterUserFormComponent {

  user = {
    firstName: '',
    lastName: '',
    telephoneNumber: '',
    email: '',
    password: ''
  };

  submitForm() {
    // Your form submission logic goes here
    console.log('Form submitted:', this.user);
  }
}
