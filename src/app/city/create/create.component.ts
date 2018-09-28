import { CountryService } from './../../country/country.service';
import { CountryModels } from './../../country/country-models';
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

  cityForm: FormGroup;
  stateList: StateModels[];
  nonBindedStateList: StateModels[];
  selectedState: number;
  countryList: CountryModels[];
  selectedCountry: number;

  constructor(private cityEntity: CityModels, private router: Router, private cityDataService: CityService,
    private stateDataService: StateService, private fb: FormBuilder, private spinner: NgxSpinnerService,
    private countryService: CountryService) {
    this.cityForm  = this.fb.group({
      countryid: new FormControl(0, Validators.compose(
        [Validators.required, Validators.min(1)
        ] )),
      stateid: new FormControl(0, Validators.compose(
        [Validators.required, Validators.min(1)
        ] )),
      citycode: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3)
      ])),
      cityname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(250)
      ])),

      chkActive: new FormControl(),
    });
   }

   saveState() {
    this.spinner.show();
    setTimeout(() => {
      this.cityEntity.CityCode = this.cityForm.value.citycode;
      this.cityEntity.CityName = this.cityForm.value.cityname;
      this.cityEntity.Status = this.cityForm.value.chkActive;
      this.cityEntity.StateId = this.selectedState;

      this.cityDataService.createRow(this.cityEntity).subscribe(
        data => {
          this.spinner.hide();
          this.router.navigate(['home/city/list']);
        },
        err => {
          console.log(err);
          this.spinner.hide();
        }
      );
    }, 1000);
  }

  loadStateLists() {
    this.spinner.show();
    setTimeout(() => {
      this.stateDataService.getAll().subscribe(
        data => {
          this.nonBindedStateList = data;
          this.spinner.hide();
        },
        err => {
          console.log(err);
          this.spinner.hide();
        }
      );
    }, 1000);
  }

  onStateSelect(val: any) {
    this.selectedState = val;
  }

  loadCountryLists() {
    this.spinner.show();
    setTimeout(() => {
      this.countryService.getAll().subscribe(
        data => {
          console.log(data);
          this.countryList = data;
          this.spinner.hide();
        },
        err => {
          console.log(err);
          this.spinner.hide();
        }
      );
    }, 1000);
  }

  onCountrySelect(val: any) {
    this.spinner.show();
    setTimeout(() => {
      this.stateList = this.nonBindedStateList.filter(
        (item) => {
          return item.CountryId === Number(val);
        });
      console.log(this.stateList);
      this.selectedCountry = val;
      this.cityForm.value.stateid = 0;
      this.spinner.hide();
    }, 2000);
  }

  ngOnInit() {
    this.loadCountryLists();
    this.loadStateLists();
  }

}
