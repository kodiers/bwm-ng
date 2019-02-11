import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {Review} from './shared/review.model';
import {ReviewService} from './shared/review.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  @Input() bookingId: string;
  @Output() reviewSubmited = new EventEmitter();

  modalRef: any;
  review: Review = {text: '', rating: 3};
  errors: any[];

  constructor(private modalService: NgbModal,
              private reviewService: ReviewService) { }

  ngOnInit() {
  }

  openReviewModal(content) {
    this.modalRef = this.modalService.open(content);
  }

  confirmReview() {
    this.reviewService.createReview(this.review, this.bookingId).subscribe(
      (review: Review) => {
        this.reviewSubmited.emit(review);
        this.modalRef.close();
      },
      (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.errors;
      });
  }

  handleRatingChange(event) {
    this.review.rating = event.rating;
  }

}
