import { CountryModels } from './../../country/country-models';
import { CountryService } from './../../country/country.service';
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

  cityForm: FormGroup;
  editCity: CityModels;
  countryList: CountryModels[];
  initialStateList: StateModels[];
  stateList: StateModels[];
  selectedState: number;
  selectedCountry: number;

  constructor(private router: Router, private cityDataService: CityService, private stateDataService: StateService,
    private fb: FormBuilder, private activatedRoute: ActivatedRoute, private spinner: NgxSpinnerService,
    private countryService: CountryService) {
    this.cityForm  = this.fb.group({
      countryid: new FormControl('0', Validators.compose(
        [Validators.min(1)
        ] )),
      stateid: new FormControl('0', Validators.compose(
        [Validators.min(1)
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

  loadStateById(id) {
    this.spinner.show();
    setTimeout(() => {
      this.cityDataService.getById(id).subscribe(
        data => {
          this.editCity = data;

          setTimeout(() => {
            this.selectedCountry = this.getCountryId(this.editCity.StateId);
          }, 1000);

          setTimeout(() => {
            this.getStateListByCountryId(this.selectedCountry);
          }, 1000);
          this.selectedState = this.editCity.StateId;
          setTimeout(() => {
            this.setValues(this.selectedCountry);
          }, 1000);
          this.spinner.hide();
          this.spinner.hide();
        },
        err => {
          console.log(err);
          this.spinner.hide();
        }
      );
    }, 1000);
  }

  setValues(val: any) {
    this.cityForm.setValue({
      countryid: val,
      stateid: this.editCity.StateId,
      citycode: this.editCity.CityCode,
      cityname: this.editCity.CityName,
      chkActive: this.editCity.Status
    });
  }

  // initial
  getCountryId(val: any) {
    // tslint:disable-next-line:triple-equals
    return this.initialStateList.find(x => x.StateId == val).CountryId;
  }

  // initial
  getStateListByCountryId(val: any) {
    this.spinner.show();
    setTimeout(() => {
          // tslint:disable-next-line:triple-equals
          this.stateList = this.initialStateList.filter(x => x.CountryId == val);
          this.spinner.hide();
    }, 1000);
  }

  // added for cascad dropdown
  loadCountryLists() {
    this.spinner.show();
    setTimeout(() => {
      this.countryService.getAll().subscribe(
        data => {
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

  loadStateLists() {
    this.spinner.show();
    setTimeout(() => {
      this.stateDataService.getAll().subscribe(
        data => {
          this.initialStateList = data;
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

  onCountrySelect(val: any) {
    this.spinner.show();
    setTimeout(() => {
      this.stateList = this.initialStateList.filter(x => x.CountryId === Number(val));
      this.selectedCountry = val;
      this.cityForm.value.stateId = 0;
      this.spinner.hide();
    }, 1000);
  }


  updateCountry() {
    this.spinner.show();
    setTimeout(() => {
      this.editCity.StateId = this.selectedState;
      this.editCity.CityCode = this.cityForm.value.citycode;
      this.editCity.CityName = this.cityForm.value.cityname;
      this.editCity.Status = this.cityForm.value.chkActive;
      this.cityDataService.updateRow(this.editCity).subscribe(
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

  deleteCity() {
    if (confirm('are you sure to delete?')) {
      this.spinner.show();
      setTimeout(() => {
        this.cityDataService.deleteById(this.editCity.CityId).subscribe(
          data => {
            this.spinner.hide();
            this.router.navigate(['home/city/list']);
          }, err => {
            this.spinner.hide();
          }
        );
      }, 1000);
    }
  }

  ngOnInit() {
    this.loadCountryLists();
    this.loadStateLists();
    this.activatedRoute.params.subscribe((params: Params) => {
      const id = params['id'];

      this.loadStateById(id);
    });
  }

}
