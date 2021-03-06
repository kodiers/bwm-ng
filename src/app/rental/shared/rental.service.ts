import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Rental} from './rental.model';

@Injectable()
export class RentalService {

  constructor(private http: HttpClient) { }

  public getRentals(): Observable<any> {
    return this.http.get('/api/v1/rentals');
  }

  public getRentalById(rentalId: string): Observable<any> {
    return this.http.get('/api/v1/rentals/' + rentalId);
  }

  public getRentalsByCity(city: string): Observable<any> {
    const params = new HttpParams().set('city', city);
    return this.http.get('/api/v1/rentals', {params});
  }

  public createRental(rental: Rental): Observable<any> {
    return this.http.post('/api/v1/rentals', rental);
  }

  public getUserRentals(): Observable<any> {
    return this.http.get('/api/v1/rentals/manage');
  }

  public deleteRental(rentalId: string): Observable<any> {
    return this.http.delete(`/api/v1/rentals/${rentalId}`);
  }

  public updateRental(rentalId: string, rentalData: any): Observable<any> {
    return this.http.patch(`/api/v1/rentals/${rentalId}`, rentalData);
  }

  public verifyRentalUser(rentalId: string): Observable<any> {
    return this.http.get(`/api/v1/rentals/${rentalId}/verify-user`);
  }

}
