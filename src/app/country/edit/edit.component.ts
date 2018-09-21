import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl,FormBuilder, Validators, FormGroup } from '@angular/forms';

import { CountryModels } from '../country-models';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class CountryEditComponent implements OnInit {
  countryForm:FormGroup;
  ediitCountry:CountryModels;

  constructor(private router:Router, private countryDataService:CountryService, private fb: FormBuilder, private activatedRoute : ActivatedRoute, private spinner: NgxSpinnerService) { 
    this.countryForm  = this.fb.group({
      
      countrycode: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3)
      ])),
      countryname: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(250)
      ])),
      
      chkActive:new FormControl(),
     
    })
  }

  loadCountryById(id){
    this.spinner.show();
    setTimeout(()=>{
      this.countryDataService.getById(id).subscribe(
        data=>{
          this.ediitCountry=data;
          this.setValues();
          this.spinner.hide();
        },
        err=>{
          console.log(err);
          this.spinner.hide();
        }
      );
    },1000);
  }

  setValues(){
    this.countryForm.setValue({
      countrycode:this.ediitCountry.CountryCode,
      countryname:this.ediitCountry.CountryName,
      chkActive:this.ediitCountry.Status
    });
  }
 
  updateCountry(){
    this.spinner.show();
    setTimeout(()=>{
      this.ediitCountry.CountryCode = this.countryForm.value.countrycode;
      this.ediitCountry.CountryName = this.countryForm.value.countryname;
      this.ediitCountry.Status = this.countryForm.value.chkActive;
      
      this.countryDataService.updateRow(this.ediitCountry).subscribe(
        data=>{
          this.spinner.hide();
          this.router.navigate(['home/country/list']); 
        },
        err=>{
          console.log(err);
          this.spinner.hide();
        }
      );
    },1000);
  }

  deleteCountry(){
    if(confirm('are you sure to delete?')){
      this.spinner.show();
      setTimeout(()=>{
        this.countryDataService.deleteById(this.ediitCountry.CountryId).subscribe(
          data=>{
            this.spinner.hide();
            this.router.navigate(['home/country/list']); 
          },err=>{
            this.spinner.hide();
          }
        );
      },1000);
    }
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      let id = params['id'];            
      this.loadCountryById(id);              
    });
  }

}
