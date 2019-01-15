import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import {DaterangePickerComponent} from 'ng2-daterangepicker';

import {Booking} from '../../../booking/shared/booking.model';
import {HelperService} from '../../../common/service/helper.service';
import {Rental} from '../../shared/rental.model';
import {BookingService} from '../../../booking/shared/booking.service';
import {AuthService} from '../../../auth/shared/auth.service';

@Component({
  selector: 'app-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RentalDetailBookingComponent implements OnInit {
  @Input() rental: Rental;
  @ViewChild(DaterangePickerComponent) private picker: DaterangePickerComponent;
  newBooking: Booking;
  modalRef: any;

  daterange: any = {};
  bookedOutDates: any[] = [];
  errors: any[] = [];

  options: any = {
    locale: { format: Booking.DATE_FORMAT },
    alwaysShowCalendars: false,
    opens: 'left',
    autoUpdateInput: false,
    isInvalidDate: this.checkForInvalidDate.bind(this)
  };

  constructor(private helper: HelperService,
              private modalService: NgbModal,
              private bookingService: BookingService,
              private toastr: ToastrService,
              public auth: AuthService) {
  }

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

  private addNewBookedOutDates(bookingData: any) {
    const dateRange = this.helper.getBookingRangeOfDates(bookingData.startAt, bookingData.endAt);
    this.bookedOutDates.push(...dateRange);
  }

  private resetDatePicker() {
    this.picker.datePicker.setStartDate(moment());
    this.picker.datePicker.setEndDate(moment());
    this.picker.datePicker.element.val('');
  }

  selectedDate(value: any, datepicker?: any) {
    this.options.autoUpdateInput = true;
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
    this.errors = [];
    this.modalRef = this.modalService.open(content);
  }

  createBooking() {
    this.newBooking.rental = this.rental;
    this.bookingService.createBooking(this.newBooking).subscribe(
      (bookingData) => {
        this.addNewBookedOutDates(bookingData);
        this.newBooking = new Booking();
        this.modalRef.close();
        this.resetDatePicker();
        this.toastr.success('Booking has been successfully created, check your booking detail in mange section!', 'Success!');
      },
      (errorResponse) => {
        this.errors = errorResponse.error.errors;
      });
  }

}
