import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder, Validators, FormGroup  } from '@angular/forms';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

import { CountryModels } from '../country-models';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class CountryListComponent implements OnInit {
  countryForm:FormGroup;
  isUpdating:boolean;
  countryList:CountryModels[];

  constructor(private spinner: NgxSpinnerService, private fb: FormBuilder, private countryDataService : CountryService) { 
    this.countryForm  = this.fb.group({
      searchtext: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(250)
      ]))
    })
  }

  canDeactivate(): Observable<boolean> | boolean {    
    if (this.countryForm.dirty) {      
      return confirm('Discard changes for Country?');
    }
    return true;
  }

  loadLists(){
    this.spinner.show();
    setTimeout(()=>{
      this.countryDataService.getAll().subscribe(
        data=>{
          this.countryList=data;
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
      this.countryList =this.countryList.filter(u=>u.CountryCode.toLowerCase().indexOf(this.countryForm.value.searchtext.toLowerCase())>=0 || u.CountryName.toLowerCase().indexOf(this.countryForm.value.searchtext.toLowerCase())>=0);
      this.spinner.hide();  
    });
  }

  loadList(){
    this.loadLists();
    this.countryForm.reset();
  }

  ngOnInit() {
    this.loadLists();
  }

}
