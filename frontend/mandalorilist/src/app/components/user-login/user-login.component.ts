import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {LocalStorageWrapper} from "../../utilities/local-storage-wrapper";
import { RequestorUserService } from "../../providers/requestor-user.service";

@Component({
  selector: 'app-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  loading: boolean;
  loginFormGroup: FormGroup;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public _requestorUserService: RequestorUserService
  ) { }

  ngOnInit() {
    this.loading = false;

    this.loginFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit(): void {
    const localStorageWrapper = new LocalStorageWrapper();

    let userObj = {
      userDetails: {
        username: this.loginFormGroup.getRawValue().username,
        password: this.loginFormGroup.getRawValue().password
      }
    };

    this._requestorUserService.login(userObj)
      .subscribe(response => {
        localStorageWrapper.setValue(localStorageWrapper.TOKEN, response['token']);
        localStorageWrapper.setValue(localStorageWrapper.USER_ID, response['userId']);
        this.router.navigate(['movie-library']);
      },
        error => {
        console.log('ERROR: ' + JSON.stringify(error));
        });
  }

  createAccount(): void {
    this.router.navigate(['create']);
  }
}
