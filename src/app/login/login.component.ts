import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl,FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

import { LoginService } from './login.service';
import { UserModels } from '../user/user-models';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:FormGroup; 
  isInfo:boolean=false;
  infoMessage:string='';
  user:UserModels;

  constructor(private router:Router, private ds:UserDataService, private spinner: NgxSpinnerService, private fb: FormBuilder, private loginDataService:LoginService) { 
    this.form  = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10)
      ]))
    })
  }

  getLogin(){
    
    this.spinner.show();
    this.isInfo=false;
    setTimeout(()=>{
      this.loginDataService.getLoginByEmailPassword(this.form.value.email).subscribe(
        us => {                  
          this.user = us;
          
          if(this.user.PasswordHash !== this.form.value.password) {
            this.isInfo=true;
            this.infoMessage="Incorrect Password.";
          }else{
            
            this.ds.sendData(this.user);
            this.form.reset(); 
            
            this.router.navigate(['home']);        
          }        
          this.spinner.hide();
        },
        err => {        
          this.isInfo=true;
          this.infoMessage="Invalid Email Id.";    
          this.spinner.hide();     
        }
      );
    },1000);    
  }
  ngOnInit() {
    this.spinner.show();
    
    setTimeout(()=>{      
      this.spinner.hide();
    },1000);    
  }

}
