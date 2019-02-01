import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import { PaymentComponent } from './payment/payment.component';
import {PaymentService} from './shared/payment.service';

@NgModule({
  declarations: [
    PaymentComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    PaymentService
  ],
  exports: [
    PaymentComponent
  ]
})
export class PaymentModule {
}
