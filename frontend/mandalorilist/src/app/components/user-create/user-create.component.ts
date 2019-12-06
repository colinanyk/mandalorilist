import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { RequestorUserService } from "../../providers/requestor-user.service";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  loading: boolean;
  createUserFormGroup: FormGroup;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public _requestorUserService: RequestorUserService
  ) { }

  ngOnInit() {
    this.loading = false;

    this.createUserFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  submit(): void {
    const creatUserObj = {
      userDetails: {
        username: this.createUserFormGroup.getRawValue().username,
        password: this.createUserFormGroup.getRawValue().password,
        confirmPassword: this.createUserFormGroup.getRawValue().confirmPassword
      }
    };

    this._requestorUserService.create(creatUserObj)
      .subscribe(response => {
        this.router.navigate([''])
      },
        error => {
        console.log('ERROR: ' + JSON.stringify(error));
        });
  }
}
