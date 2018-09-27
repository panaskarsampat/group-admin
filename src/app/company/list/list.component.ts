import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { CompanyService } from './../company.service';
import { CompanyModels } from './../company-models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class CompanyListComponent implements OnInit {

  companyForm: FormGroup;
  isUpdating: boolean;
  companyList: CompanyModels[];

  constructor(private spinner: NgxSpinnerService, private fb: FormBuilder, private companyService: CompanyService) {
    this.companyForm  = this.fb.group({
      searchtext: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(250)
      ]))
    });
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.companyForm.dirty) {
      return confirm('Discard changes for company?');
    }
    return true;
  }

  loadLists() {
    this.spinner.show();
    setTimeout(() => {
      this.companyService.getAll().subscribe(
        data => {
          this.companyList = data;
          this.spinner.hide();
        },
        err => {
          console.log(err);
          this.spinner.hide();
        }
      );
    }, 1000);
  }

  loadList() {
    this.loadLists();
    this.companyForm.reset();
  }

  searchText() {
    this.spinner.show();
    setTimeout(() => {
      this.companyList = this.companyList.filter(u => u.EmailId.toLowerCase().indexOf(this.companyForm.value.searchtext.toLowerCase()) >= 0
      || u.CompanyName.toLowerCase().indexOf(this.companyForm.value.searchtext.toLowerCase()) >= 0);
      this.spinner.hide();
    });
  }

  ngOnInit() {
    this.loadLists();
  }

}
