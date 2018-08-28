import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder, Validators, FormGroup  } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isUpdating:boolean;
  userForm:FormGroup;

  constructor(private fb: FormBuilder) { 
    this.userForm  = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    })
  }

  canDeactivate(): Observable<boolean> | boolean {
    
    if (this.userForm.dirty) {
      
      return confirm('Discard changes for Dashboard?');
    }
    return true;
  }
  ngOnInit() {
  }

}
