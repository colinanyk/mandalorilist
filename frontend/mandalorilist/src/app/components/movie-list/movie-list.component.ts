import { Component, OnInit } from '@angular/core';
import { LocalStorageWrapper } from "../../utilities/local-storage-wrapper";
import { Router} from "@angular/router";
import { RequestorMovieListService } from "../../providers/requestor-movie-list.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { MovieListCreateComponent } from "../dialogs/movie-list-create/movie-list-create.component";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  movieLists: any;
  columns: any = ['title', 'movieCount', 'averageRating'];

  constructor(public router: Router,
              public _requestorMovieListService: RequestorMovieListService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getMovieLists()
  }

  getMovieLists() {
    this._requestorMovieListService.getMovieLists()
      .subscribe((lists => {
        this.movieLists = lists;
      }));
  }

  searchForMovies(): void {
    this.router.navigate(['/movie-library/movie-search'])
  }

  goToMovieList(id: string): void {
    this.router.navigate(['/movie-library/movie-list', id])
  }

  createMovieList(): void {
    let dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.id = 'create-movie-list';

    let dialogRef = this.dialog.open(MovieListCreateComponent);

    dialogRef.afterClosed()
      .subscribe(data => {
        this._requestorMovieListService.createMovieList(data)
          .subscribe(() => {
            this.getMovieLists();
          })
      });
  }
}
