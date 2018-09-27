import { WorkService } from './../work.service';
import { WorkModels } from './../work-models';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-work-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class WorkCreateComponent implements OnInit {
  workForm: FormGroup;
  constructor(
    private createWork: WorkModels,
    private router: Router,
    private workDataService: WorkService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {

    this.workForm  = this.fb.group({
      workname: new FormControl('', Validators.compose([
        Validators.required,        
        Validators.minLength(3),
        Validators.maxLength(256)    
      ])),
     
    });
  }
  saveWork() {
    var a;
    this.spinner.show();
    setTimeout(() => {
      this.createWork.WorkName = this.workForm.value.workname;
      this.workDataService.createWork(this.createWork).subscribe(
        data => {
          this.spinner.hide();
          this.router.navigate(['home/work/list']);
        },
        err => {
          console.log(err);
          this.spinner.hide();
        }
      );
    }, 1000);
  }

  ngOnInit() {}
}
