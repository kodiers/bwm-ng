import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import {Review} from './review.model';


@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  public createReview(review: Review, bookingId: string): Observable<any> {
    return this.http.post(`/api/v1/reviews?bookingId=${bookingId}`, review);
  }

  public getRentalReviews(rentalId: string): Observable<any> {
    return this.http.get(`/api/v1/reviews?rentalId=${rentalId}`);
  }
}
