import { StateModels } from './../../state/state-models';
import { CityService } from './../city.service';
import { CityModels } from './../city-models';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { StateService } from '../../state/state.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class CityListComponent implements OnInit {
  cityForm:FormGroup;
  isUpdating:boolean;
  cityList:CityModels[];
  stateList:StateModels[];
  
  constructor(private spinner: NgxSpinnerService, private fb: FormBuilder, private cityDataService : CityService, private stateDataService: StateService) { 
    this.cityForm  = this.fb.group({
      searchtext: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(250)
      ]))
    })
  }

  canDeactivate(): Observable<boolean> | boolean {    
    if (this.cityForm.dirty) {      
      return confirm('Discard changes for Country?');
    }
    return true;
  }

  loadLists(){
    this.spinner.show();
    setTimeout(()=>{
      this.cityDataService.getAll().subscribe(
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

  getStateName(val:number):string{
    return this.stateList.find(x => x.StateId == val).StateName;
  }

  searchText(){
    this.spinner.show();
    setTimeout(()=>{            
      this.cityList =this.cityList.filter(u=>u.CityCode.toLowerCase().indexOf(this.cityForm.value.searchtext.toLowerCase())>=0 || u.CityName.toLowerCase().indexOf(this.cityForm.value.searchtext.toLowerCase())>=0);
      this.spinner.hide();  
    });
  }

  loadList(){
    this.loadLists();
    this.cityForm.reset();
  }

  ngOnInit() {
    this.loadStateLists();
    this.loadLists();  
  }

}
