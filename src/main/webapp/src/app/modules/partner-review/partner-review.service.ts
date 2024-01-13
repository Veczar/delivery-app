import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PartnerReviewDto, PartnerReviewReadDto } from 'src/app/shared/model/api-models';
import { Observable } from 'rxjs';

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
  getReviews(): Observable<PartnerReviewReadDto[]> {
    return this.http.get<PartnerReviewReadDto[]>(`http://localhost:8080/api/partners/reviews`);
  }
}
