import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {Subject} from 'rxjs/Subject';

import {ToastsManager} from 'ng2-toastr';
import {UcWordsPipe} from 'ngx-pipes';

import {Rental} from '../shared/rental.model';
import {RentalService} from '../shared/rental.service';

@Component({
  selector: 'app-rental-update',
  templateUrl: './rental-update.component.html',
  styleUrls: ['./rental-update.component.scss']
})
export class RentalUpdateComponent implements OnInit {

  rental: Rental;
  rentalCategories = Rental.CATEGORIES;
  locationSubject: Subject<any> = new Subject();

  constructor(private route: ActivatedRoute,
              private rentalService: RentalService,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef,
              private upperPipe: UcWordsPipe) {
    this.toastr.setRootViewContainerRef(vcr);
    this.transformLocation = this.transformLocation.bind(this);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getRental(params['rentalId']);
    });
  }

  transformLocation(location: string): string {
    return this.upperPipe.transform(location);
  }

  getRental(rentalId: string) {
    this.rentalService.getRentalById(rentalId).subscribe((rental: Rental) => {
      this.rental = rental;
    });
  }

  updateRental(rentalId: string, rentalData: any) {
    this.rentalService.updateRental(rentalId, rentalData).subscribe(
      (updatedRental: Rental) => {
        this.rental = updatedRental;
        if (rentalData.city || rentalData.street) {
          this.locationSubject.next(this.rental.city + ', ' + this.rental.street);
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastr.error(errorResponse.error.errors[0].detail, 'Error');
        this.getRental(rentalId);
      });
  }

  countBedroomAssets(assetsNum: number) {
    return parseInt(<any>this.rental.bedrooms || 0, 10) + assetsNum;
  }

}
