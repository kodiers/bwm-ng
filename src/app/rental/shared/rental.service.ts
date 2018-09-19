import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Rental} from './rental.model';

@Injectable()
export class RentalService {

  private rentals: Rental[] = [{
    id: '1',
    title: 'Central Apartment 1',
    city: 'New-York',
    street: 'Times Square',
    category: 'apartment',
    image: 'http://via.placeholder.com/350x250',
    bedrooms: 3,
    description: 'Very nice apartment',
    dailyRate: 34,
    shared: false,
    created: '24/12/2017'
  },
  {
    id: '2',
    title: 'Central Apartment 2',
    city: 'New-York',
    street: 'Times Square',
    category: 'apartment',
    image: 'http://via.placeholder.com/350x250',
    bedrooms: 3,
    description: 'Very nice apartment',
    dailyRate: 34,
    shared: false,
    created: '24/12/2017'
  },
  {
    id: '3',
    title: 'Central Apartment 3',
    city: 'New-York',
    street: 'Times Square',
    category: 'apartment',
    image: 'http://via.placeholder.com/350x250',
    bedrooms: 3,
    description: 'Very nice apartment',
    dailyRate: 34,
    shared: false,
    created: '24/12/2017'
  },
  {
    id: '4',
    title: 'Central Apartment 4',
    city: 'New-York',
    street: 'Times Square',
    category: 'apartment',
    image: 'http://via.placeholder.com/350x250',
    bedrooms: 3,
    description: 'Very nice apartment',
    dailyRate: 34,
    shared: false,
    created: '24/12/2017'
  }];

  constructor() { }

  public getRentals(): Observable<Rental[]> {
    return new Observable<Rental[]>((observer) => {
      setTimeout(() => {
        observer.next(this.rentals);
      }, 1000);
    });
  }

  public getRentalById(rentalId: string): Observable<Rental> {
    return new Observable<Rental>((observer) => {
      setTimeout(() => {
        const foundRental = this.rentals.find((rental) => {
          return rental.id === rentalId;
        });
        observer.next(foundRental);
      }, 500);
    });
  }

}
