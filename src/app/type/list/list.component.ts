import { TypeService } from './../type.service';
import { Type } from './../type.model';

import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class TypeListComponent implements OnInit {
  typeForm:FormGroup;
  isUpdating:boolean;
  typeList:Type[];

  constructor(private spinner: NgxSpinnerService, private fb: FormBuilder, private dataService : TypeService) {
    this.typeForm  = this.fb.group({
      searchtext: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(250)
      ]))
    })
   }

   canDeactivate(): Observable<boolean> | boolean {    
    if (this.typeForm.dirty) {      
      return confirm('Discard changes for Country?');
    }
    return true;
  }

  loadLists(){
    this.spinner.show();
    setTimeout(()=>{
      this.dataService.getAll().subscribe(        
        data=>{
          debugger;
          this.typeList=data;
          this.spinner.hide();
        },
        err=>{
          console.log(err);
          this.spinner.hide();
        }
      );
    },1000);
  }

  searchText(){
    this.spinner.show();
    setTimeout(()=>{            
      this.typeList =this.typeList.filter(u=>u.CompanyType.toLowerCase().indexOf(this.typeForm.value.searchtext.toLowerCase())>=0);
      this.spinner.hide();  
    });
  }

  loadList(){
    this.loadLists();
    this.typeForm.reset();
  }
  
  ngOnInit() {
    this.loadList();
  }

}
