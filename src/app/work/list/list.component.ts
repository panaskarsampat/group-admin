import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { WorkService } from '../work.service';
import { WorkModels } from '../work-models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-work-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class WorkListComponent implements OnInit {
  isUpdating: boolean;
  workForm: FormGroup;
  workList: WorkModels[];
  constructor(
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private workService: WorkService
  ) {
    this.workForm  = this.fb.group({
      searchtext: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(250)
      ]))
    });
  }

  ngOnInit() {
    this.loadWorkLists();
  }
  canDeactivate(): Observable<boolean> | boolean {
    if (this.workForm.dirty) {
      return confirm('Discard changes for User?');
    }
    return true;
  }
  searchText() {
    this.spinner.show();
    setTimeout(() => {
      this.workList = this.workList.filter(
        u =>
          u.WorkName.toLowerCase().indexOf(
            this.workForm.value.searchtext.toLowerCase()
          ) >= 0
      );
      this.spinner.hide();
    });
  }
  loadWorkLists() {
    this.spinner.show();
    setTimeout(() => {
      this.workService.getAllWorks().subscribe(
        data => {
          this.workList = data;

          this.spinner.hide();
        },
        err => {
          this.spinner.hide();
        }
      );
    }, 1000);
  }
  loadList() {
    this.loadWorkLists();
    this.workForm.reset();
  }
}
