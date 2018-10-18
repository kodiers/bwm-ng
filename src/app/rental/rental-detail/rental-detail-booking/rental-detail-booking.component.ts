import {Component, Input, OnInit} from '@angular/core';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

import {Booking} from '../../../booking/shared/booking.model';
import {HelperService} from '../../../common/service/helper.service';
import {Rental} from '../../shared/rental.model';

@Component({
  selector: 'app-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {
  @Input() rental: Rental;
  newBooking: Booking;

  daterange: any = {};
  bookedOutDates: any[] = [];

  options: any = {
    locale: { format: Booking.DATE_FORMAT },
    alwaysShowCalendars: false,
    opens: 'left',
    isInvalidDate: this.checkForInvalidDate.bind(this)
  };

  constructor(private helper: HelperService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.newBooking = new Booking();
    this.getBookedOutDates();
  }

  private checkForInvalidDate(date) {
    return this.bookedOutDates.includes(this.helper.formatBookingDate(date)) || date.diff(moment(), 'days') < 0;
  }

  private getBookedOutDates() {
    const bookings: Booking[] = this.rental.bookings;
    if (bookings && bookings.length > 0) {
      bookings.forEach((booking: Booking) => {
        const dateRange = this.helper.getBookingRangeOfDates(booking.startAt, booking.endAt);
        this.bookedOutDates.push(...dateRange);
      });
    }
  }

  selectedDate(value: any, datepicker?: any) {
    this.newBooking.startAt = this.helper.formatBookingDate(value.start);
    this.newBooking.endAt = this.helper.formatBookingDate(value.end);
    this.newBooking.days = -(value.start.diff(value.end, 'days'));
    this.newBooking.totalPrice = this.newBooking.days * this.rental.dailyRate;

    // or manupulat your own internal property
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
  }

  openConfirmModal(content) {
    this.modalService.open(content);
  }

  createBooking() {
    console.log(this.newBooking);
  }

}
