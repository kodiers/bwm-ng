import {NgModule} from '@angular/core';

import { AgmCoreModule } from '@agm/core';

import {MapComponent} from './map.component';

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
  ]
})
export class MapModule {
}
