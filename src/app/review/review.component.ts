import { Component, OnInit } from '@angular/core';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {Review} from './shared/review.model';
import {ReviewService} from './shared/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  modalRef: any;
  review: Review = {text: '', rating: 3};

  constructor(private modalService: NgbModal,
              private reviewService: ReviewService) { }

  ngOnInit() {
  }

  openReviewModal(content) {
    this.modalRef = this.modalService.open(content);
  }

  confirmReview() {
    console.log(this.review);
  }

  handleRatingChange(event) {
    this.review.rating = event.rating;
  }

}
