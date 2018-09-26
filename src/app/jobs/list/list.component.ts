import { JobsModels } from './../jobs-models';
import { JobsService } from './../jobs.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class JobsListComponent implements OnInit {
  jobsForm:FormGroup;
  isUpdating:boolean;
  jobsList:JobsModels[];

  constructor(private spinner:NgxSpinnerService, private fb:FormBuilder, private dataService : JobsService) {
    this.jobsForm  = this.fb.group({
      searchtext: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(250)
      ]))
    })
  }

  canDeactivate(): Observable<boolean> | boolean {    
    if (this.jobsForm.dirty) {      
      return confirm('Discard changes for Jobs?');
    }
    return true;
  }

  loadLists(){
    this.spinner.show();
    setTimeout(()=>{
      this.dataService.getAll().subscribe(
        data=>{
          this.jobsList=data;
          this.spinner.hide();
        },
        err=>{
          console.log(err);
          this.spinner.hide();
        }
      );
    },1000);
  }

  loadList(){
    this.loadLists();
    this.jobsForm.reset();
  }

  searchText(){
    this.spinner.show();
    setTimeout(()=>{            
      this.jobsList =this.jobsList.filter(u=>u.JobName.toLowerCase().indexOf(this.jobsForm.value.searchtext.toLowerCase())>=0 || u.JobTitle.toLowerCase().indexOf(this.jobsForm.value.searchtext.toLowerCase())>=0 || u.ContactPerson.toLowerCase().indexOf(this.jobsForm.value.searchtext.toLowerCase())>=0 );
      this.spinner.hide();  
    });
  }

  ngOnInit() {
    this.loadLists();
  }

}
