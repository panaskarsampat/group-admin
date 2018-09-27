import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { UserModels } from '../user-models';
import { UserService } from '../user.service';
import { UserDataService } from '../../user-data.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class UserEditComponent implements OnInit {
  edituser: UserModels;
  edituserId: string;
  userForm: FormGroup;
  userCreatedBy: string;
  userModifiedBy: string;
  loggedUser: UserModels;

  constructor(private router: Router, private ds: UserDataService, private fb: FormBuilder, private userDataService: UserService,
    private activatedRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
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
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25)
      ])),
      chkEmailConfirm: new FormControl(),
      chkActive: new FormControl(),

      createddate: new FormControl(),

      modifieddate: new FormControl()
    });

  }

  loadUserById(id) {
    this.spinner.show();
    setTimeout(() => {

      this.userDataService.getUserById(id).subscribe(
        data => {
          this.edituser = data;
         // this.edituser.ModifiedBy = '';
          this.setValues();
          this.spinner.hide();
        }
      );
    }, 1000);
  }

  setValues() {
    this.userForm.setValue({
      email: this.edituser.UserEmail,
      fullname: this.edituser.UserFullName,
      username: this.edituser.UserName,
      password: this.edituser.PasswordHash,
      phonenumber: this.edituser.PhoneNumber,
      chkEmailConfirm: this.edituser.IsUserEmailConfirmed,
      chkActive: this.edituser.IsUserActive,
      createddate: this.edituser.CreatedDateTime,
      modifieddate: this.edituser.ModifiedDateTime
    });
    this.getEmailBy(this.edituser.CreatedBy, 1);
    this.getEmailBy(this.edituser.ModifiedBy, 2);
  }

  getEmailBy(id, index) {
    setTimeout(() => {
      this.userDataService.getUserById(id).subscribe(
        data => {
           if (index === 1 ) {
            this.userCreatedBy = data.UserEmail;
           } else {
             this.userModifiedBy = data.UserEmail;
           }
        }
      );
    }, 1000);
  }

  updateUserProfile() {
    this.spinner.show();
    this.edituser.UserId = this.edituser.UserId;
    this.edituser.UserEmail = this.userForm.value.email;
    this.edituser.UserFullName = this.userForm.value.fullname;
    this.edituser.UserName = this.userForm.value.username;
    this.edituser.PasswordHash = this.userForm.value.password;
    this.edituser.PhoneNumber = this.userForm.value.phonenumber;
    this.edituser.IsUserEmailConfirmed = this.userForm.value.chkEmailConfirm;
    this.edituser.IsUserActive = this.userForm.value.chkActive;
    this.edituser.ModifiedBy = this.loggedUser.UserId;

    setTimeout(() => {
      this.userDataService.updateUser(this.edituser).subscribe(
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

  deleteUser() {
    if (confirm('are you sure to delete?')) {
      this.spinner.show();
      setTimeout(() => {
        this.userDataService.deleteUser(this.edituser.UserId).subscribe(
          data => {
            this.spinner.hide();
            this.router.navigate(['home/user/list']);
          }, err => {
            this.spinner.hide();
          }
        );
      }, 1000);
    }
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const id = params['id'];
      this.edituserId = id;
      this.loadUserById(this.edituserId);
    });
    this.loggedUser = this.ds.getUser();
  }
}
