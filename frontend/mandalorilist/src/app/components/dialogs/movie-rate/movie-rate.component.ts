import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import {MovieListSingleComponent} from "../../movie-list-single/movie-list-single.component";

@Component({
  selector: 'app-movie-rate',
  templateUrl: './movie-rate.component.html',
  styleUrls: ['./movie-rate.component.scss']
})
export class MovieRateComponent implements OnInit {

  rateMovieForm: FormGroup;
  movieId: string;

  constructor(
    public formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<MovieListSingleComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.movieId = data;
  }

  ngOnInit() {
    this.rateMovieForm = this.formBuilder.group({
      rating: ['', Validators.required]
    });
  }

  save() {
    let ratingObj = {
      movieId: this.movieId,
      rating: this.rateMovieForm.getRawValue().rating
    };

    this.dialogRef.close(ratingObj);
  }

}
