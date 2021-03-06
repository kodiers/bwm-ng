import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';

import {BookingService} from '../../booking/shared/booking.service';
import {Booking} from '../../booking/shared/booking.model';
import {PaymentService} from '../../payment/shared/payment.service';
import {Review} from '../../review/shared/review.model';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.scss']
})
export class ManageBookingComponent implements OnInit {
  bookings: Booking[];
  payments: any[];

  constructor(private bookingService: BookingService,
              private paymentService: PaymentService) { }

  ngOnInit() {
    this.bookingService.getUserBookings().subscribe(
      (bookings: Booking[]) => {
        this.bookings = bookings;
      },
      (errorResponse) => {});
    this.getPendingPayments();
  }

  getPendingPayments() {
    this.paymentService.getPendingPayments().subscribe(
      (payments) => {
        this.payments = payments;
      },
      () => {});
  }

  acceptPayment(payment) {
    this.paymentService.acceptPayment(payment).subscribe(
      (json) => {
        payment.status = 'paid';
      },
      (err) => {});
  }

  declinePayment(payment) {
    this.paymentService.declinePayment(payment).subscribe(
      (json) => {
        payment.status = 'declined';
      },
      (err) => {});
  }

  isExpired(endAtText: string) {
    const timeNow = moment();
    const endAt = moment(endAtText);
    return endAt.isBefore(timeNow);
  }

  reviewPublished(bookingIndex: number, review: Review) {
    this.bookings[bookingIndex]['review'] = review;
  }

}
