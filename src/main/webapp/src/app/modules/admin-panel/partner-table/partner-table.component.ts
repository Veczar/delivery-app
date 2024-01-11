import { Component } from '@angular/core';
import {PartnerDto} from 'src/app/shared/model/api-models';
import { ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PartnerService } from '../../partner-view/partner.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/toast/toast.service';


@Component({
  selector: 'app-partner-table',
  templateUrl: './partner-table.component.html',
  styleUrls: ['./partner-table.component.scss']
})
export class PartnerTableComponent {
  dataSource!: MatTableDataSource<PartnerDto>;
  partnerForm!: FormGroup;
  editable = false;
  submitted: boolean = false;

  displayedColumns: string[] = ['id','name', 'accountNumber', 'contactNumber' ,'openHour','closeHour'
                                ,'type', 'websiteLink'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private partnerService: PartnerService,
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) {
    this.loadData();
    this.initForm();
  }

  ngAfterViewInit(): void {
    // Check if exampleModal is defined before accessing nativeElement
    const exampleModal = document.getElementById('userModal');
    if (exampleModal) {
      exampleModal.addEventListener('hidden.bs.modal', () => {
        // console.log('Modal exited or closed');
        this.loadData(); //refresh
        this.editable = false;
        this.partnerForm.disable();
      });
    }
  }

  initForm(): void {
    this.partnerForm = this.formBuilder.group({
      id: [''],
      owner: [''],
      photoPath: [''],
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', Validators.required],
      openHour: ['', Validators.required ],
      closeHour: ['', Validators.required],
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

  loadData(): void {
    this.partnerService.getPartnersAll().subscribe(
      (partners: PartnerDto[]) => {
        this.dataSource = new MatTableDataSource<PartnerDto>(partners);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(partners);
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.partnerForm.controls;
  }

  click(partner: PartnerDto) {
    this.submitted = false;
    this.partnerForm.patchValue(partner);
    this.partnerForm.get('type')?.setValue(partner.type?.toString());
  }

  toggleEditMode(): void {
    console.log(this.partnerForm.value)
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
      // transform the role to be an object with id
      const partner: PartnerDto = this.partnerForm.value;
      this.partnerService.updatePartner(partner).subscribe(r => {
        this.toastService.show(`Partner ${r.id} edited`);
        // console.log(r)
      });

      this.submitted = false;
      this.partnerForm.disable();
    }
  }

  deletePartner(): void {
    this.partnerService.deletePartner(this.partnerForm.value.id).subscribe(r => {
      console.log('partner deleted');
      this.toastService.show(`Partner ${r.id} deleted`);
      // console.log(r)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
