import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

import {CamelizePipe} from 'ngx-pipes';

declare var google: any;

@Injectable()
export class MapService {

  private geoCoder;
  private locationCache: any = {};

  constructor(private camelizePipe: CamelizePipe) { }

  private camelize(value: string): string {
    return this.camelizePipe.transform(value);
  }

  private cacheLocation(location: string, coordinates: any) {
    const camilizedLocation = this.camelize(location);
    this.locationCache[camilizedLocation] = coordinates;
  }

  private isLocationCached(location: string): boolean {
    const camilizedLocation = this.camelize(location);
    return this.locationCache[camilizedLocation];
  }

  private geocodeLocation(location: string): Observable<any> {
    if (!this.geoCoder) {
      this.geoCoder = new (<any>window).google.maps.Geocoder();
    }
    return new Observable((observer) => {
      this.geoCoder.geocode({address: location}, (result, status) => {
        if (status === 'OK') {
          const geometry = result[0].geometry.location;
          const coordinates = {lat: geometry.lat(), lng: geometry.lng()};
          this.cacheLocation(location, coordinates);
          observer.next(coordinates);
        } else {
          observer.error('Location could not be geocoded');
        }
      });
    });
  }

  public getGeoLocation(location: string): Observable<any> {
    if (this.isLocationCached(location)) {
      return of(this.locationCache[this.camelize(location)]);
    } else {
      return this.geocodeLocation(location);
    }
  }
}
