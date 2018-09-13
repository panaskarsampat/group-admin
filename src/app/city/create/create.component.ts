import { StateModels } from './../../state/state-models';
import { StateService } from './../../state/state.service';
import { CityService } from './../city.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CityModels } from './../city-models';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CityCreateComponent implements OnInit {

  cityForm:FormGroup;
  stateList:StateModels[];
  selectedState:number;

  constructor(private cityEntity: CityModels, private router: Router, private cityDataService: CityService, private stateDataService:StateService, private fb: FormBuilder, private spinner: NgxSpinnerService) {
    this.cityForm  = this.fb.group({      
      stateid: new FormControl(0,Validators.compose(
        [Validators.required,Validators.min(1)
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

   saveState(){
    this.spinner.show();
    setTimeout(()=>{
      this.cityEntity.CityCode = this.cityForm.value.citycode;
      this.cityEntity.CityName = this.cityForm.value.cityname;
      this.cityEntity.Status = this.cityForm.value.chkActive;
      this.cityEntity.StateId = this.selectedState;
      
      this.cityDataService.createRow(this.cityEntity).subscribe(
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
   
  ngOnInit() {
    this.loadStateLists();
  }

}
