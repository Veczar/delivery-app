import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PartnerDto } from 'src/app/shared/model/api-models';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { PartnerService } from '../partner.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-partner-edit-form',
  templateUrl: './partner-edit-form.component.html',
  styleUrls: ['./partner-edit-form.component.scss'],
})
export class PartnerEditFormComponent implements OnInit{

  partnerForm!: FormGroup;
  editable = false;
  submitted: boolean = false;
  
  @Input()
  partner!: PartnerDto;

  @Output()
  dataChangedEvent = new EventEmitter<void>();
  
  constructor(
    private partnerService: PartnerService,
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.partnerForm.patchValue(this.partner);
  }

  initForm(): void {
    this.partnerForm = this.formBuilder.group({
      id: [''],
      owner: [''],
      photoPath: [''],
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', Validators.required],
      openHour: ['', [Validators.required, Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)]],
      closeHour: ['', [Validators.required, Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)]],
      websiteLink: ['', Validators.required],
      expectedWaitingTime: ['', Validators.required],
      accountNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{26}$/) // Format numeru konta XX XXXX XXXX XXXX XXXX XXXX XXXX
        ]
      ],
      contactNumber: [
        '',
        [
          Validators.required,
          Validators.maxLength(14),
        ]
      ],
      type:['', [Validators.required]],
    });

    this.partnerForm.disable();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.partnerForm.controls;
  }

  toggleEditMode(): void {
    // console.log(this.partnerForm.value)
    Object.keys(this.partnerForm.controls).forEach(key => {
      const control = this.partnerForm.get(key);
      if (control) {
        control.setValue(control.value);
      }
    });

    if (this.partnerForm.invalid) {
      console.log('wrong form');
      return;
    }

    this.editable = !this.editable;

    // Enable or disable form controls based on edit mode
    if (this.editable) {
      this.submitted = true;
      this.partnerForm.enable();
    } 
    else {
      const partner: PartnerDto = this.partnerForm.value;
      this.partnerService.updatePartner(partner).subscribe(r => {
        this.toastService.show(`Partner ${r.id} edited`);
        this.dataChangedEvent.emit();
      });

      this.submitted = false;
      this.partnerForm.disable();
    }
  }

  cancel() {
    if (this.editable) {
      this.editable = !this.editable;
      console.log('cancelled')

      this.partnerForm.reset(this.partner);

      this.submitted = false;
      this.partnerForm.disable();
    }
  }
}
