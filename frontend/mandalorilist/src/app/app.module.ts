import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

// Components
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { MovieListLibraryComponent } from './components/movie-list-library/movie-list-library.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieListSingleComponent } from './components/movie-list-single/movie-list-single.component';
import { MovieSearchComponent } from './components/movie-search/movie-search.component';

// Dialogs
import { MovieAddToListComponent } from './components/dialogs/movie-add-to-list/movie-add-to-list.component';
import { MovieListCreateComponent } from "./components/dialogs/movie-list-create/movie-list-create.component";
import { MovieRateComponent } from './components/dialogs/movie-rate/movie-rate.component';

// External Modules
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatInputModule, MatSortModule} from "@angular/material";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button'
import { MatTableModule}  from '@angular/material/table';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';

// Providers
import { RequestorUserService } from "./providers/requestor-user.service";
import { RequestorMovieListService} from "./providers/requestor-movie-list.service";

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserCreateComponent,
    MovieListLibraryComponent,
    MovieListComponent,
    MovieListSingleComponent,
    MovieSearchComponent,
    MovieAddToListComponent,
    MovieListCreateComponent,
    MovieAddToListComponent,
    MovieRateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    HttpClientModule,
    MatTableModule,
    MatStepperModule,
    MatDialogModule,
    MatSortModule,
  ],
  providers: [
    RequestorUserService,
    RequestorMovieListService],
  bootstrap: [AppComponent],
  entryComponents: [
    UserLoginComponent,
    MovieAddToListComponent,
    MovieListCreateComponent,
    MovieRateComponent
  ]
})
export class AppModule { }
