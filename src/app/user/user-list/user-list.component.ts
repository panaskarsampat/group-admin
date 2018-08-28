import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder, Validators, FormGroup  } from '@angular/forms';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

import { UserModels } from '../user-models';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  isUpdating:boolean;
  userForm:FormGroup;
  userlist:UserModels[];

  constructor(private spinner: NgxSpinnerService, private fb: FormBuilder, private userDataService : UserService) { 
    this.userForm  = this.fb.group({
      searchtext: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(250)
      ]))
    })
  }

  canDeactivate(): Observable<boolean> | boolean {
    
    if (this.userForm.dirty) {
      
      return confirm('Discard changes for User?');
    }
    return true;
  }

  loadUserLists(){
    this.spinner.show();
    setTimeout(()=>{
      this.userDataService.getUsers().subscribe(
        data => {                  
          this.userlist = data;
                         
          this.spinner.hide();
        },
        err => {        
          
          this.spinner.hide();     
        }
      );
    },1000);    
  }

  editUser(id){
    console.log(id);
  }

  searchText(){
    this.spinner.show();
    setTimeout(()=>{
      
      this.userlist =this.userlist.filter(u=>u.UserEmail.indexOf(this.userForm.value.searchtext)>=0 || u.UserFullName.indexOf(this.userForm.value.searchtext)>=0 || u.UserName.indexOf(this.userForm.value.searchtext)>=0 || u.PhoneNumber.indexOf(this.userForm.value.searchtext)>=0);
      this.spinner.hide();  
    });
  }

  loadList(){
    this.loadUserLists();
    this.userForm.reset();
  }
  ngOnInit() {
    this.loadUserLists();
  }


}
