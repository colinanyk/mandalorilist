import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { RequestorMovieService } from "../../providers/requestor-movie.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { MovieAddToListComponent } from "../dialogs/movie-add-to-list/movie-add-to-list.component";
import {Observable} from "rxjs";
import {MovieDetails} from "../../models/movie-details";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {

  movies: any;
  movieDetails: Observable<MovieDetails>;
  searchForm: FormGroup;
  page: number = 1;
  columns: any = ['title', 'year', 'poster'];

  constructor(
    public router: Router,
    public _requestorMovieService: RequestorMovieService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog) { }

  ngOnInit() {

    this.searchForm = this.formBuilder.group({
      title: ['', Validators.required]
    })
  }

  searchForMovies() {
    let searchCriteria = {
      title: this.searchForm.getRawValue().title,
      page: this.page
    };

    this._requestorMovieService.searchForMovies(searchCriteria)
      .subscribe(response => {
        this.movies = response['Search'];
      })
  }

  getMovieDetails(imdbId: string) {
    this.movieDetails = this._requestorMovieService.getMovieDetails(imdbId);

    let dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.id = 'create-movie-list';
    dialogConfig.data = {
      movieDetails: this.movieDetails
    };

    let dialogRef = this.dialog.open(MovieAddToListComponent, dialogConfig);
    dialogRef.afterClosed()
      .subscribe(data => {
        this._requestorMovieService.addMovieToLists(data)
          .subscribe(response => {
            this.router.navigate(['/movie-library/'])
          }, error => {
            this.router.navigate(['/movie-library/'])
          });
      })
  }

  back(): void {
    this.router.navigate(['/movie-library/'])
  }


}
