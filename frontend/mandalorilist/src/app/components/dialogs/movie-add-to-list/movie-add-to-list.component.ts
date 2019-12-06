import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { MovieSearchComponent } from "../../movie-search/movie-search.component";
import { RequestorMovieListService } from "../../../providers/requestor-movie-list.service";
import {Observable} from "rxjs";
import {MovieDetails} from "../../../models/movie-details";

@Component({
  selector: 'app-movie-add-to-list',
  templateUrl: './movie-add-to-list.component.html',
  styleUrls: ['./movie-add-to-list.component.scss']
})
export class MovieAddToListComponent implements OnInit {

  _movieDetails: Observable<MovieDetails>;
  movieDetails: any;
  movieLists: any;
  movieListForm: FormGroup;

  constructor(
    public _requestorMovieListService: RequestorMovieListService,
    public formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<MovieSearchComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this._movieDetails = data.movieDetails;
  }

  ngOnInit() {
    this.movieListForm = this.formBuilder.group({
      lists: new FormArray([])
    });


    this._requestorMovieListService.getMovieLists()
      .subscribe(response => {
        this.movieLists = response;
        console.log('MOVIE LIST: ' + JSON.stringify(response));
        this.movieLists.forEach((o, i) => {
          let control = new FormControl(i === 0);
          (this.movieListForm.controls.lists as FormArray).push(control);
        });
      });

    this._movieDetails.
    subscribe(details => {
      this.movieDetails = new MovieDetails(
        details['Title'],
        details['Year'],
        details['Rated'],
        details['Genre'],
        details['Poster'],
        details['Plot'],
        details['imdbId'],
        details['totalRating']);
    });

  }

  save(movieDetails) {

    const listIds = this.movieListForm.value.lists
      .map((v, i) => v ? this.movieLists[i]._id : null)
      .filter(v => v !== null);
    console.log(listIds);
    console.log(JSON.stringify(movieDetails));

    let saveObj = {
      movieDetails: movieDetails,
      movieLists: listIds
    };

    this.dialogRef.close(saveObj);
  }

}
