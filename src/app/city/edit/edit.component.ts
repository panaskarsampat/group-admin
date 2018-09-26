import { CityService } from './../city.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CityModels } from './../city-models';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { StateService } from '../../state/state.service';
import { StateModels } from '../../state/state-models';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class CityEditComponent implements OnInit {

  cityForm:FormGroup;
  editCity:CityModels;
  stateList:StateModels[];
  selectedState:number;

  constructor(private router:Router, private cityDataService:CityService, private stateDataService: StateService, private fb:FormBuilder, private activatedRoute:ActivatedRoute, private spinner:NgxSpinnerService) { 
    this.cityForm  = this.fb.group({      
      stateid: new FormControl('0',Validators.compose(
        [Validators.min(1)
        ] )),
      citycode: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3)
      ])),
      cityname: new FormControl('',Validators.compose([
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
      this.cityDataService.getById(id).subscribe(
        data=>{
          this.editCity=data;
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
    this.cityForm.setValue({
      stateid:this.editCity.StateId,
      citycode:this.editCity.CityCode,
      cityname:this.editCity.CityName,
      chkActive:this.editCity.Status
    });
  }

  loadStateLists(){
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

  onStateSelect(val:any){
    this.selectedState = val;
   }


  updateCountry(){
    this.spinner.show();
    setTimeout(()=>{
      this.editCity.StateId = this.selectedState;
      this.editCity.CityCode = this.cityForm.value.citycode;
      this.editCity.CityName = this.cityForm.value.cityname;
      this.editCity.Status = this.cityForm.value.chkActive;
      
      this.cityDataService.updateRow(this.editCity).subscribe(
        data=>{
          this.spinner.hide();
          this.router.navigate(['home/city/list']); 
        },
        err=>{
          console.log(err);
          this.spinner.hide();
        }
      );
    },1000);
  }
  deleteCity(){
    if(confirm('are you sure to delete?')){
      this.spinner.show();
      setTimeout(()=>{
        this.cityDataService.deleteById(this.editCity.CityId).subscribe(
          data=>{
            this.spinner.hide();
            this.router.navigate(['home/city/list']); 
          },err=>{
            this.spinner.hide();
          }
        );
      },1000);
    }
  }
  ngOnInit() {
    this.loadStateLists();
    this.activatedRoute.params.subscribe((params: Params) => {
      let id = params['id'];      
      
      this.loadStateById(id);       
    });
  }

}
