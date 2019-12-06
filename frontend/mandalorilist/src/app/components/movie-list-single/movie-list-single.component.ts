import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { RequestorMovieListService } from "../../providers/requestor-movie-list.service";
import { RequestorMovieService } from "../../providers/requestor-movie.service";
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import {MovieRateComponent} from "../dialogs/movie-rate/movie-rate.component";

@Component({
  selector: 'app-movie-list-single',
  templateUrl: './movie-list-single.component.html',
  styleUrls: ['./movie-list-single.component.scss']
})
export class MovieListSingleComponent implements OnInit {

  id: string;
  dataSource: any;
  //Model for single list
  movieList: any;
  columns: any = ['title', 'poster', 'year', 'genre', 'rated', 'rating', 'remove', 'rateMovie'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public _requestorMovieListService: RequestorMovieListService,
    public _requestorMovieService: RequestorMovieService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this._requestorMovieListService.getMovieList(this.id)
      .subscribe(response => {
        this.movieList = response;
        this.dataSource = new MatTableDataSource(this.movieList.movies);
        this.dataSource.sort = this.sort;
      });

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  back(): void {
    this.router.navigate(['/movie-library/'])
  }

  remove(movieId, listId) {
    let movieObj = {
      movieId: movieId,
      listId: listId
    };
    this._requestorMovieService.removeMovieFromList(movieObj)
      .subscribe(response => {
        this.router.navigate(['/movie-library/']);
      });
  }

  rateMovie(movieId) {
    let dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.id = 'create-movie-list';
    dialogConfig.data = movieId;

    let dialogRef = this.dialog.open(MovieRateComponent, dialogConfig);

    dialogRef.afterClosed()
      .subscribe(data => {
        this._requestorMovieService.ratemovie(data.movieId, data.rating)
          .subscribe(response => {
            this.router.navigate(['/movie-library/'])
          }, error => {
            this.router.navigate(['/movie-library/'])
          });
      })
  }

  searchForMovies(): void {
    this.router.navigate(['/movie-library/movie-search'])
  }
}
