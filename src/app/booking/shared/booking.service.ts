import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {Booking} from './booking.model';

@Injectable()
export class BookingService {

  constructor(private http: HttpClient) { }

  public createBooking(booking: Booking) {
    return this.http.post('/api/v1/bookings', booking);
  }

  public getUserBookings(): Observable<any> {
    return this.http.get('/api/v1/bookings/manage');
  }
}
