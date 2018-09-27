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
import { CategoryService } from './../../category/category.service';
import { Category } from './../../category/category';
import { TypeService } from './../../type/type.service';
import { Type } from './../../type/type.model';
import { CompanyService } from './../company.service';
import { CompanyModels } from './../company-models';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CompanyCreateComponent implements OnInit {
  companyForm: FormGroup;
  isUpdating: boolean;
  typeList: Type[];
  selectedType: number;

  categoryList: Category[];
  selectedCategory: number;

  countryList: CountryModels[];
  selectedCountry: number;

  stateList: StateModels[];
  selectedState: number;
  cityList: CityModels[];
  selectedCity: number;

  constructor(private companyEntity: CompanyModels, private router: Router, private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute, private fb: FormBuilder, private stateService: StateService,
    private countryService: CountryService, private CityService: CityService, private categoryService: CategoryService,
    private typeService: TypeService, private companyService: CompanyService) {
    this.companyForm  = this.fb.group({
      companyTypeId: new FormControl(0, Validators.compose([
        Validators.min(1)
      ])),
      companyCategoryId: new FormControl(0, Validators.compose([
        Validators.min(1)
      ])),
      countryId: new FormControl(0, Validators.compose([
        Validators.min(1)
      ])),
      stateId: new FormControl(0, Validators.compose([
        Validators.min(1)
      ])),
      cityId: new FormControl(0, Validators.compose([
        Validators.min(1)
      ])),

      companyCode: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8)
      ])),
      companyName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])),
      aboutCompany: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(20)
      ])),
      companyAddress: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(250)
      ])),
      emailId: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(250)
      ])),
      mailId: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(250)
      ])),
      phoneNumber1: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(25)
      ])),
      phoneNumber2: new FormControl('', Validators.compose([
        Validators.minLength(10),
        Validators.maxLength(25)
      ])),
      postalCode: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6)
      ])),
      siteId: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(250)
      ])),

      modifiedBy: new FormControl('', Validators.compose([
      ])),
      modifiedDateTime: new FormControl('', Validators.compose([
      ])),
      createdBy: new FormControl('', Validators.compose([
      ])),
      createdDateTime: new FormControl('', Validators.compose([
      ])),
      isActive: new FormControl(),
    });
  }

  onTypeSelect(val: any) {
    this.selectedType = val;
  }
  onCategorySelect(val: any) {
    this.selectedCategory = val;
  }
  onCountrySelect(val: any) {
    this.selectedCountry = val;
  }
  onStateSelect(val: any) {
    this.selectedState = val;
  }
  onCitySelect(val: any) {
    this.selectedCity = val;
  }

  loadTypeLists() {
    this.spinner.show();
    setTimeout(() => {
      this.typeService.getAll().subscribe(
        data => {
          this.typeList = data;
          this.spinner.hide();
        },
        err => {
          console.log(err);
          this.spinner.hide();
        }
      );
    }, 1000);
  }
  loadCategoryLists() {
    this.spinner.show();
    setTimeout(() => {
      this.categoryService.getAll().subscribe(
        data => {
          this.categoryList = data;
          this.spinner.hide();
        },
        err => {
          console.log(err);
          this.spinner.hide();
        }
      );
    }, 1000);
  }
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
      this.stateService.getAll().subscribe(
        data => {
          this.stateList = data;
          this.spinner.hide();
        },
        err => {
          console.log(err);
          this.spinner.hide();
        }
      );
    }, 1000);
  }
  loadCityLists() {
    this.spinner.show();
    setTimeout(() => {
      this.CityService.getAll().subscribe(
        data => {
          this.cityList = data;
          this.spinner.hide();
        },
        err => {
          console.log(err);
          this.spinner.hide();
        }
      );
    }, 1000);
  }

  saveCompany() {
    this.spinner.show();
    setTimeout(() => {
      this.companyEntity.CompanyCode = this.companyForm.value.companyCode;
      this.companyEntity.CompanyName = this.companyForm.value.companyName;
      this.companyEntity.AboutCompany = this.companyForm.value.aboutCompany;
      this.companyEntity.CompanyAddress = this.companyForm.value.companyAddress;
      this.companyEntity.EmailId = this.companyForm.value.emailId;
      this.companyEntity.MailId = this.companyForm.value.mailId;
      this.companyEntity.PhoneNumber1 = this.companyForm.value.phoneNumber1;
      this.companyEntity.PhoneNumber2 = this.companyForm.value.phoneNumber2;
      this.companyEntity.PostalCode = this.companyForm.value.postalCode;
      this.companyEntity.SiteId = this.companyForm.value.siteId;
      this.companyEntity.CompanyTypeId = this.selectedType;
      this.companyEntity.CompanyCategoryId = this.selectedCategory;
      this.companyEntity.CountryId = this.selectedCountry;
      this.companyEntity.StateId = this.selectedState;
      this.companyEntity.CityId = this.selectedCity;
      this.companyEntity.ModifiedBy = this.companyForm.value.modifiedBy;
      this.companyEntity.ModifiedDateTime = this.companyForm.value.modifiedDateTime;
      this.companyEntity.CreatedBy = this.companyForm.value.createdBy;
      this.companyEntity.CreatedDateTime = this.companyForm.value.createdDateTime;
      this.companyEntity.IsActive = this.companyForm.value.isActive;

      this.companyService.createRow(this.companyEntity).subscribe(
        data => {
          this.spinner.hide();
          this.router.navigate(['home/company/list']);
        },
        err => {
          console.log(err);
          this.spinner.hide();
        }
      );
    }, 1000);
  }

  ngOnInit() {
    this.loadTypeLists();
    this.loadCategoryLists();
    this.loadCountryLists();
    this.loadStateLists();
    this.loadCityLists();
  }

}
