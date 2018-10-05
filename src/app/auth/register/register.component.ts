import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formData: any = {};

  constructor() { }

  ngOnInit() {
  }

  register(registerForm: NgForm) {
    console.log(this.formData);
  }

}
