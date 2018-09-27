import {NgModule} from '@angular/core';

import { AgmCoreModule } from '@agm/core';
import {CamelizePipe} from 'ngx-pipes';

import {MapComponent} from './map.component';
import {MapService} from './map.service';

@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAaJChbXH2CRAG_YeKfmrrJ9kZzpNNgrKg'
    })
  ],
  exports: [
    MapComponent
  ],
  providers: [
    MapService,
    CamelizePipe
  ]
})
export class MapModule {
}
