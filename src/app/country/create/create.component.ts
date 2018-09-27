import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl,FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { CountryModels } from '../country-models';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CountryCreateComponent implements OnInit {
  countryForm:FormGroup;
  
  constructor(private createCountry:CountryModels, private router:Router, private countryDataService:CountryService, private fb: FormBuilder, private activatedRoute : ActivatedRoute, private spinner: NgxSpinnerService) { 
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

  saveCountry(){
    this.spinner.show();
    setTimeout(()=>{
      this.createCountry.CountryCode = this.countryForm.value.countrycode;
      this.createCountry.CountryName = this.countryForm.value.countryname;
      this.createCountry.Status = this.countryForm.value.chkActive;
      
      this.countryDataService.createRow(this.createCountry).subscribe(
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
    ngOnInit() {
    }
}
