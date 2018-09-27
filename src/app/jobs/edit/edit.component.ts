import { JobsService } from './../jobs.service';
import { JobsModels } from './../jobs-models';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

import { CityService } from './../../city/city.service';
import { CityModels } from './../../city/city-models';
import { StateService } from './../../state/state.service';
import { StateModels } from './../../state/state-models';
import { CountryService } from './../../country/country.service';
import { CountryModels } from './../../country/country-models';
import { PositionService } from './../../position/position.service';
import { PositionModels } from './../../position/position-models';
import { CompanyService } from './../../company/company.service';
import { CompanyModels } from './../../company/company-models';
import { WorkService } from './../../work/work.service';
import { WorkModels } from './../../work/work-models';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class JobsEditComponent implements OnInit {

  jobForm: FormGroup;
  isUpdating: boolean;
  jobEntity: JobsModels;

  countryList: CountryModels[];
  selectedCountry: number;
  stateList: StateModels[];
  selectedState: number;
  cityList: CityModels[];
  selectedCity : number;
  companyList: CompanyModels[];
  selectedCompany: number;
  positionList: PositionModels[];
  selectedPosition: number;
  workList: WorkModels[];
  selectedWork: number;

  currentDate:any;

  constructor(private router:Router, private spinner:NgxSpinnerService, private activatedRoute:ActivatedRoute, private fb:FormBuilder, private stateService: StateService, private countryService: CountryService, private CityService: CityService, private companyService : CompanyService, private workService: WorkService, private positionService: PositionService, private jobService: JobsService) {
    this.jobForm  = this.fb.group({      
      locationCountryId: new FormControl(0,Validators.compose([
        Validators.min(1)
      ])),
      locationStateId: new FormControl(0,Validators.compose([
        Validators.min(1)
      ])),
      locationCityId: new FormControl(0,Validators.compose([
        Validators.min(1)
      ])),
      companyId: new FormControl(0,Validators.compose([
        Validators.min(1)
      ])),
      positionId: new FormControl(0,Validators.compose([
        Validators.min(1)
      ])),
      workId: new FormControl(0,Validators.compose([
        Validators.min(1)
      ])),
      
      jobCode: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8)
      ])),
      jobName: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])),
      jobTitle: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ])),
      contactPerson: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(250)
      ])),
      jobDesc: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(20)
      ])),
      postalCode: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6)
      ])),
      workExp: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(2)
      ])),
      workSkills: new FormControl('',Validators.compose([    
        Validators.minLength(10),
        Validators.maxLength(250)
      ])),

      createdBy: new FormControl('',Validators.compose([
      ])),
      createdDateTime: new FormControl('',Validators.compose([
      ])),
      modifiedBy: new FormControl('',Validators.compose([
      ])),
      modifiedDateTime: new FormControl('',Validators.compose([
      ])),
      
      isActive: new FormControl(),     
    })
  }

  loadCityLists(){
    this.spinner.show();
    setTimeout(()=>{
      this.CityService.getAll().subscribe(
        data=>{
          this.cityList=data;
          this.spinner.hide();
        },
        err=>{
          console.log(err);
          this.spinner.hide();
        }
      );
    },1000);
  }
  onCitySelect(val:any){
    this.selectedCity = val;
  }

  loadStateLists(){
    this.spinner.show();
    setTimeout(()=>{
      this.stateService.getAll().subscribe(
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

  loadCountryLists(){
    this.spinner.show();
    setTimeout(()=>{
      this.countryService.getAll().subscribe(
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
  onCountrySelect(val:any){
    this.selectedCountry = val;
  }

  loadCompanyLists(){
    this.spinner.show();
    setTimeout(()=>{
      this.companyService.getAll().subscribe(
        data=>{
          this.companyList=data;
          this.spinner.hide();
        },
        err=>{
          console.log(err);
          this.spinner.hide();
        }
      );
    },1000);
  }
  onCompanySelect(val:any){
    this.selectedCompany = val;
  }

  loadPositionLists(){
    this.spinner.show();
    setTimeout(()=>{
      this.positionService.getAll().subscribe(
        data=>{
          this.positionList=data;
          this.spinner.hide();
        },
        err=>{
          console.log(err);
          this.spinner.hide();
        }
      );
    },1000);
  }
  onPositionSelect(val:any){
    this.selectedPosition = val;
  }

  loadworkLists(){
    this.spinner.show();
    setTimeout(()=>{
      this.workService.getAllWorks().subscribe(
        data=>{
          this.workList=data;
          this.spinner.hide();
        },
        err=>{
          console.log(err);
          this.spinner.hide();
        }
      );
    },1000);
  }
  onWorkSelect(val:any){
    this.selectedWork = val;
  }

  loadById(id){
    this.spinner.show();
    setTimeout(()=>{
      this.jobService.getById(id).subscribe(
        data=>{
          this.jobEntity=data;
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

  updateJob(){
    this.spinner.show();
    setTimeout(()=>{
      this.jobEntity.JobCode = this.jobForm.value.jobCode;
      this.jobEntity.JobName = this.jobForm.value.jobName;
      this.jobEntity.JobTitle = this.jobForm.value.jobTitle;
      this.jobEntity.ContactPerson = this.jobForm.value.contactPerson;
      this.jobEntity.JobDesc = this.jobForm.value.jobDesc;
      this.jobEntity.PostalCode = this.jobForm.value.postalCode;
      this.jobEntity.WorkExp = this.jobForm.value.workExp;
      this.jobEntity.WorkSkills = this.jobForm.value.workSkills;
      
      this.jobEntity.LocationCountryId = this.selectedCountry;
      this.jobEntity.LocationStateId = this.selectedState;
      this.jobEntity.LocationCityId = this.selectedCity;
      this.jobEntity.CompanyId = this.selectedCompany;
      this.jobEntity.PositionId = this.selectedPosition;
      this.jobEntity.WorkId = this.selectedWork;
      
      this.currentDate = new Date();     
      
      this.jobEntity.ModifiedBy = this.jobForm.value.modifiedBy//this.currentDate.toDateString() +' '+ this.currentDate.toLocalTimeString();
      this.jobEntity.ModifiedDateTime = this.jobForm.value.modifiedDateTime;
      this.jobEntity.CreatedBy = this.jobForm.value.createdBy;
      this.jobEntity.CreatedDateTime = this.jobForm.value.createdDateTime;
      this.jobEntity.IsActive = this.jobForm.value.isActive;
      
      this.jobService.updateRow(this.jobEntity).subscribe(
        data=>{
          this.spinner.hide();
          this.router.navigate(['home/jobs/list']); 
        },
        err=>{
          console.log(err);
          this.spinner.hide();
        }
      );
    },1000);
  }

  delete(){
    if(confirm('are you sure to delete?')){
      this.spinner.show();
      setTimeout(()=>{
        this.companyService.deleteById(this.jobEntity.JobId).subscribe(
          data=>{
            this.spinner.hide();
            this.router.navigate(['home/jobs/list']); 
          },err=>{
            this.spinner.hide();
          }
        );
      },1000);
    }
  }
  
  setValues(){
    this.jobForm.setValue({
      jobCode:this.jobEntity.JobCode,
      jobName:this.jobEntity.JobName,
      jobTitle:this.jobEntity.JobTitle,
      contactPerson:this.jobEntity.ContactPerson,
      jobDesc:this.jobEntity.JobDesc,
      postalCode:this.jobEntity.PostalCode,
      workExp:this.jobEntity.WorkExp,
      workSkills:this.jobEntity.WorkSkills,

      locationCountryId:this.jobEntity.LocationCountryId,
      locationStateId:this.jobEntity.LocationStateId,
      locationCityId:this.jobEntity.LocationCityId,
      companyId:this.jobEntity.CompanyId,
      positionId:this.jobEntity.PositionId,
      workId:this.jobEntity.WorkId,      

      modifiedBy:this.jobEntity.ModifiedBy,
      modifiedDateTime:this.jobEntity.ModifiedDateTime,
      createdBy:this.jobEntity.CreatedBy,
      createdDateTime:this.jobEntity.CreatedDateTime,
      isActive:this.jobEntity.IsActive,
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      let id = params['id'];      
      
      this.loadById(id);       
    });
    
    this.loadPositionLists();
    this.loadCompanyLists();
    this.loadCountryLists();
    this.loadStateLists();
    this.loadCityLists();
    this.loadworkLists();
  }

}
