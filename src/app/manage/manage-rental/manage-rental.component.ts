import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';

import {RentalService} from '../../rental/shared/rental.service';
import {Rental} from '../../rental/shared/rental.model';

@Component({
  selector: 'app-manage-rental',
  templateUrl: './manage-rental.component.html',
  styleUrls: ['./manage-rental.component.scss']
})
export class ManageRentalComponent implements OnInit {
  rentals: Rental[];
  rentalDeleteIndex: number;

  constructor(private rentalService: RentalService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.rentalService.getUserRentals().subscribe(
      (rentals: Rental[]) => {
        this.rentals = rentals;
      },
      (errorResponse) => {}
    );
  }

  deleteRental(rentalId: string) {
    this.rentalService.deleteRental(rentalId).subscribe(
      () => {
        this.rentals.splice(this.rentalDeleteIndex, 1);
        this.rentalDeleteIndex = undefined;
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastr.error(errorResponse.error.errors[0].detail, 'Failed');
      });
  }

}
