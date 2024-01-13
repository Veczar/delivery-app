import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { PartnerDto, PartnerReviewReadDto } from 'src/app/shared/model/api-models';
import { AuthService } from '../../auth/auth.service';
import { PartnerReviewService } from '../partner-review.service';

@Component({
  selector: 'app-partner-review',
  templateUrl: './partner-review.component.html',
  styleUrls: ['./partner-review.component.scss']
})
export class PartnerReviewComponent implements OnInit{

  @Input()
  partner!: PartnerDto;
  @Input()
  reviews!: PartnerReviewReadDto[];

  isUserLogged: boolean = false;
  selectedStar: number = 0;
  submitted = false;
  
  reviewForm!: FormGroup;
  userId: number | undefined;

  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private reviewService: PartnerReviewService,
    private datePipe: DatePipe
  ) {}

    initForm(): void {
      this.reviewForm = this.formBuilder.group({
        id: [''],
        description: ['', [Validators.required, Validators.maxLength(255)]],
        gradeInStars: ['', [Validators.required, Validators.pattern(/^[1-5]$/)]],
        date: [null],
        partner: this.formBuilder.group({
          id: [null],
        }),
        reviewer: this.formBuilder.group({
          id: [null],
        }),
      });
    }

  ngOnInit():void{
      
      this.isUserLoggedIn().subscribe((isLoggedIn: boolean) => {
        this.isUserLogged = isLoggedIn;
        if(this.isUserLogged){
          this.userId = Number(localStorage.getItem('id'));
        }
      });

      this.initForm();

      console.log(this.reviews);
      console.log(this.isUserLogged);
  }

  isUserLoggedIn(): Observable<boolean> {
    return of(this.authService.isUserLogged());
  }

  open(modal: any): void {
    this.modalService.dismissAll();
    this.modalService.open(modal);
  }
  selectStar(star: number): void {
    this.reviewForm.get('gradeInStars')?.setValue(star);
    this.selectedStar = star;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.reviewForm.controls;
  }

  submitReview() {
    this.submitted = true;

    Object.keys(this.reviewForm.controls).forEach(key => {
      const control = this.reviewForm.get(key);
      if (control) {
        control.setValue(control.value);
      }
    });

    if (this.reviewForm.valid) {
      const reviewerId = localStorage.getItem('id');
      this.reviewForm.get('reviewer.id')?.setValue(reviewerId);

      const partnerId = this.partner.id;
      this.reviewForm.get('partner.id')?.setValue(partnerId);
  
      const currentDate = new Date();
      const formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');

      // this.reviewForm.patchValue({ creationDate: formattedDate });
      this.reviewForm.get('date')?.setValue(formattedDate);

      console.log(JSON.stringify(this.reviewForm.value));

      this.reviewService.postReview(this.reviewForm.value).subscribe(data =>{
        console.log(data);
        //this.modalService.dismissAll();
      });

      function refreshPage() {
        location.reload();
      }

    refreshPage();
    }else {
      console.log(this.reviewForm.value)
      console.log('wrong form');
      return;
    }
      
  }
  deleteReview(reviewId: number): void {
    this.reviewService.deleteReview(reviewId).subscribe(() => {
      // Odśwież listę recenzji po usunięciu
      this.reviews = this.reviews.filter(review => review.id !== reviewId);
      function refreshPage() {
        location.reload();
      }
      refreshPage();
    });
  }

  
}
