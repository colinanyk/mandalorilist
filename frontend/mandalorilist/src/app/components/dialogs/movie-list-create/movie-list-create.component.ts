import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {LocalStorageWrapper} from "../../../utilities/local-storage-wrapper";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { MovieListComponent } from "../../movie-list/movie-list.component";

@Component({
  selector: 'app-movie-list-create',
  templateUrl: './movie-list-create.component.html',
  styleUrls: ['./movie-list-create.component.scss']
})
export class MovieListCreateComponent implements OnInit {

  createMovieListForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<MovieListComponent>) { }

  ngOnInit() {
    let localStorageWrapper = new LocalStorageWrapper;
    this.createMovieListForm = this.formBuilder.group({
      title: ['', Validators.required],
      userId: localStorageWrapper.getValue(localStorageWrapper.USER_ID),
    });
  }

  save(): void{
    this.dialogRef.close(this.createMovieListForm.getRawValue());
  }

}
