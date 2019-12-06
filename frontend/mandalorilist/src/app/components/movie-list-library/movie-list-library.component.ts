import { Component, OnInit } from '@angular/core';
import { LocalStorageWrapper } from "../../utilities/local-storage-wrapper";
import { Router} from "@angular/router";

@Component({
  selector: 'app-movie-list-library',
  templateUrl: './movie-list-library.component.html',
  styleUrls: ['./movie-list-library.component.scss']
})
export class MovieListLibraryComponent implements OnInit {

  constructor(
    public router: Router) { }

  ngOnInit() {
  }

  logout(): void {
    const localStorageWrapper = new LocalStorageWrapper();

    localStorageWrapper.removeStorageItem(localStorageWrapper.TOKEN);
    this.router.navigate(['']);
  }

}
