import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from "./components/user-login/user-login.component";
import { UserCreateComponent } from "./components/user-create/user-create.component";
import { MovieListLibraryComponent } from "./components/movie-list-library/movie-list-library.component";
import { MovieListComponent } from "./components/movie-list/movie-list.component";
import { MovieListSingleComponent } from "./components/movie-list-single/movie-list-single.component";
import { MovieSearchComponent } from "./components/movie-search/movie-search.component";

const routes: Routes = [
  {path: '', component: UserLoginComponent},
  {path: 'create', component: UserCreateComponent},
  {path: 'movie-library', component: MovieListLibraryComponent, children: [
      {path: '', component: MovieListComponent},
      {path: 'movie-lists', component: MovieListComponent},
      {path: 'movie-list/:id', component: MovieListSingleComponent},
      {path: 'movie-search', component: MovieSearchComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
