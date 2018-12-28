import {Component, Input, OnInit} from '@angular/core';
import {EditableComponent} from '../editable-component';

@Component({
  selector: 'app-editable-select',
  templateUrl: './editable-select.component.html',
  styleUrls: ['./editable-select.component.scss']
})
export class EditableSelectComponent extends EditableComponent implements OnInit {
  @Input() options: any[];
}
