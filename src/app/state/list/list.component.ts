import { CountryService } from './../../country/country.service';
import { CountryModels } from './../../country/country-models';
import { StateService } from './../state.service';
import { StateModels } from './../state-models';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-state-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class StateListComponent implements OnInit {
  stateForm:FormGroup;
  isUpdating:boolean;
  stateList:StateModels[];
  countryList:CountryModels[];
  country:CountryModels;

  constructor(private spinner:NgxSpinnerService, private fb:FormBuilder, private stateDataService: StateService, private countryDataService: CountryService) {
    this.stateForm  = this.fb.group({
      searchtext: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(250)
      ]))
    })
   }

   canDeactivate(): Observable<boolean> | boolean {    
    if (this.stateForm.dirty) {      
      return confirm('Discard changes for Country?');
    }
    return true;
  }

  loadLists(){
    this.spinner.show();
    setTimeout(()=>{
      this.stateDataService.getAll().subscribe(
        data=>{
          this.stateList=data;
          this.spinner.hide();
        },
        err=>{
          console.log(err);
          this.spinner.hide();
        }
      );
    },1000);
  }

  getCountryName(val:number):string{
    return this.countryList.find(x=>x.CountryId == val).CountryName;
  }

  loadCountryLists(){
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
      this.stateList =this.stateList.filter(u=>u.StateCode.toLowerCase().indexOf(this.stateForm.value.searchtext.toLowerCase())>=0 || u.StateName.toLowerCase().indexOf(this.stateForm.value.searchtext.toLowerCase())>=0);
      this.spinner.hide();  
    });
  }

  loadList(){
    this.loadLists();
    this.stateForm.reset();
  }

  ngOnInit() {
    this.loadCountryLists();
    this.loadLists();
  }

}
