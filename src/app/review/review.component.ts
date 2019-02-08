import { Component, OnInit } from '@angular/core';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {Review} from './shared/review.model';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  modalRef: any;
  review: Review = {text: '', rating: 3};

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  openReviewModal(content) {
    this.modalRef = this.modalService.open(content);
  }

  confirmReview() {
    console.log(this.review);
  }

}
