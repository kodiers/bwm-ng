import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpParams} from '@angular/common/http';

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

}
