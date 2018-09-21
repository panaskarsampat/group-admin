import { CountryModels } from './../../country/country-models';
import { CountryService } from './../../country/country.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { StateService } from './../state.service';
import { StateModels } from './../state-models';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class StateEditComponent implements OnInit {
  stateForm:FormGroup;
  editState:StateModels;
  selectedCountry:number;
  countryList:CountryModels[];

  constructor(private router:Router, private stateDataService:StateService, private countryDataService: CountryService, private fb:FormBuilder, private activatedRoute:ActivatedRoute, private spinner:NgxSpinnerService) {
    this.stateForm  = this.fb.group({      
      countryid: new FormControl(0,Validators.compose(
        [] )),
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

   loadStateById(id){
    this.spinner.show();
    setTimeout(()=>{
      this.stateDataService.getById(id).subscribe(
        data=>{
          this.editState=data;
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
    this.stateForm.setValue({
      countryid:this.editState.CountryId,
      statecode:this.editState.StateCode,
      statename:this.editState.StateName,
      chkActive:this.editState.Status
    });
  }

  updateCountry(){
    this.spinner.show();
    setTimeout(()=>{
      this.editState.CountryId = this.selectedCountry;
      this.editState.StateCode = this.stateForm.value.statecode;
      this.editState.StateName = this.stateForm.value.statename;
      this.editState.Status = this.stateForm.value.chkActive;
      
      this.stateDataService.updateRow(this.editState).subscribe(
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

  deleteState(){
    if(confirm('are you sure to delete?')){
      this.spinner.show();
      setTimeout(()=>{
        this.stateDataService.deleteById(this.editState.StateId).subscribe(
          data=>{
            this.spinner.hide();
            this.router.navigate(['home/state/list']); 
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
      this.loadStateById(id);       
    });
    this.loadLists();
  }
}
