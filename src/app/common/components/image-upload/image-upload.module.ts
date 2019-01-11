import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import { ImageCropperModule } from 'ngx-image-cropper';

import {ImageUploadComponent} from './image-upload.component';
import {ImageUploadService} from './image-upload.service';


@NgModule({
  imports: [
    CommonModule,
    ImageCropperModule
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
