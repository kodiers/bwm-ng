import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-editable-input',
  templateUrl: './editable-input.component.html',
  styleUrls: ['./editable-input.component.scss']
})
export class EditableInputComponent implements OnInit {
  @Input() entity: any;
  @Input() field: string;

  isActiveInput = false;

  constructor() { }

  ngOnInit() {
  }

}
