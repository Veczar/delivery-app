import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PartnerReviewDto } from 'src/app/shared/model/api-models';

@Injectable({
  providedIn: 'root'
})
export class PartnerReviewService {

  constructor(
    private http: HttpClient,
  ) { }

  postReview(review:PartnerReviewDto) {
    return this.http.post(`http://localhost:8080/api/partners/reviews`, review);
  }
  deleteReview(id:number) {
    return this.http.delete(`http://localhost:8080/api/partners/reviews/${id}`);
  }
}
