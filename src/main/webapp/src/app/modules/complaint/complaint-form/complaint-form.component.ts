import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../modules/auth/auth.service';
import { ComplaintService } from '../complaint.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComplaintDto } from 'src/app/shared/model/api-models';
import { ToastService } from 'src/app/shared/toast/toast.service';
@Component({
  selector: 'app-complaint-form',
  templateUrl: './complaint-form.component.html',
  styleUrls: ['./complaint-form.component.scss']
})
export class ComplaintFormComponent {
  complaintForm!: FormGroup;
  submitted: boolean = false;

  constructor(
    //private userService: UserService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private modalService: NgbModal,
    private complaintService: ComplaintService,
    private toastService: ToastService,
  ) {
    this.initForm();
  }

  initForm(): void {
    this.complaintForm = this.formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(60),
          Validators.pattern(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ ]+$/)
        ]],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(300),
          Validators.pattern(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ ]+$/)
        ]],
        methodOfContact:['', [Validators.required]],
    });
  }

  sendComplaint(id?: number)
  {
   this.submitted = true;
    Object.keys(this.complaintForm.controls).forEach(key => {
      const control = this.complaintForm.get(key);
      if (control) {
        control.setValue(control.value);
      }
    });

    if (this.complaintForm.invalid) {
      console.log('wrong form')
      return;
    }

    this.complaintService.addProduct(this.complaintForm.value as ComplaintDto).subscribe(
      (response: ComplaintDto) => {
        console.log('response:', response);

        if (response !== null) {
          this.toastService.showSuccess('Comaint sent');
        }
      }
    );
    this.modalService.dismissAll();
  }
  
  get f(): { [key: string]: AbstractControl } {
    return this.complaintForm.controls;
  }
}
