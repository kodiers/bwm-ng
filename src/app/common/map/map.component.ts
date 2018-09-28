import {ChangeDetectorRef, Component, Input} from '@angular/core';

import {MapService} from './map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  @Input() location: string;
  lat: number;
  lng: number;
  isPositionError = false;

  constructor(private mapService: MapService,
              private ref: ChangeDetectorRef) { }

  mapReadyHandler() {
    this.mapService.getGeoLocation(this.location).subscribe((coordinates) => {
      this.lat = coordinates.lat;
      this.lng = coordinates.lng;
      this.ref.detectChanges();
    }, () => {
      this.isPositionError = true;
    });
  }
}
