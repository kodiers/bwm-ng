import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {UserComponent} from './user.component';
import {UserService} from './shared/user.service';
import { UserDetailComponent } from './user-detail/user-detail.component';
import {AuthGuard} from '../auth/shared/auth.guard';


const routes: Routes = [
  { path: 'users', component: UserComponent, children: [
      {path: 'profile', component: UserDetailComponent, canActivate: [AuthGuard]}
    ]
  }
];


@NgModule({
  declarations: [
    UserComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  providers: [
    UserService
  ]
})
export class UserModule {
}
