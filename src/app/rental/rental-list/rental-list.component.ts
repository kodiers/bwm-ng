import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.scss']
})
export class RentalListComponent implements OnInit {
  rentals: any[] = [{
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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

  ngOnInit() {
  }

}
