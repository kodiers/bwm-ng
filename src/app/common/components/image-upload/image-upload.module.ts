import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ImageUploadComponent} from './image-upload.component';
import {ImageUploadService} from './image-upload.service';


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ImageUploadComponent
  ],
  declarations: [
    ImageUploadComponent
  ],
  providers: [
    ImageUploadService
  ]
})
export class ImageUploadModule {
}
