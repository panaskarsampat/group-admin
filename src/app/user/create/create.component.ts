import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { UserModels } from '../user-models';
import { UserService } from '../user.service';
import { UserDataService } from '../../user-data.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class UserCreateComponent implements OnInit {

  userForm: FormGroup;
  loggedUser: UserModels;

  constructor(private router: Router, private ds: UserDataService, private fb: FormBuilder, private userDataService: UserService,
    private activatedRoute: ActivatedRoute, private spinner: NgxSpinnerService, private entity: UserModels) {
    this.userForm  = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      fullname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(250)
      ])),
      username: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(250)
      ])),
      phonenumber: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^(0|[1-9][0-9]*)$'),
        Validators.minLength(10),
        Validators.maxLength(10)
      ])),
    });

  }

  save() {
    this.spinner.show();
    this.entity.UserEmail = this.userForm.value.email;
    this.entity.UserFullName = this.userForm.value.fullname;
    this.entity.UserName = this.userForm.value.username;
    this.entity.PhoneNumber = this.userForm.value.phonenumber;
    this.entity.CreatedBy = this.loggedUser.UserId;

    setTimeout(() => {
      this.userDataService.createUser(this.entity).subscribe(
        data => {
          this.spinner.hide();
          this.router.navigate(['home/user/list']);
        },
        err => {
          this.spinner.hide();
        }
      );
    }, 1000);
  }

  ngOnInit() {
    this.loggedUser = this.ds.getUser();
  }

}
