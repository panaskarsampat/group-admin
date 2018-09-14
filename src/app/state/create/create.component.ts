import { CountryModels } from './../../country/country-models';
import { CountryService } from './../../country/country.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StateService } from '../state.service';
import { StateModels } from './../state-models';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class StateCreateComponent implements OnInit {
  stateForm:FormGroup;
  countryList: CountryModels[];
  selectedCountry:number;

  constructor(private stateEntity:StateModels, private countryDataService:CountryService, private router:Router, private stateDataService:StateService, private fb:FormBuilder, private activatedRoute:ActivatedRoute, private spinner:NgxSpinnerService) {
    this.stateForm  = this.fb.group({      
      countryid: new FormControl('0',Validators.compose(
        [Validators.required, Validators.min(1)] )),
      statecode: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(3)
      ])),
      statename: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(250)
      ])),
      
      chkActive:new FormControl(),
     
    })
   }

   onCountrySelect(val:any){
    this.selectedCountry = val;
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

   saveState(){
    this.spinner.show();
    setTimeout(()=>{
      this.stateEntity.StateCode = this.stateForm.value.statecode;
      this.stateEntity.StateName = this.stateForm.value.statename;
      this.stateEntity.Status = this.stateForm.value.chkActive;
      this.stateEntity.CountryId = this.selectedCountry;
      
      this.stateDataService.createRow(this.stateEntity).subscribe(
        data=>{
          this.spinner.hide();
          this.router.navigate(['home/state/list']); 
        },
        err=>{
          console.log(err);
          this.spinner.hide();
        }
      );
    },1000);  
  }

  ngOnInit() {
    this.loadLists();
  }

}
