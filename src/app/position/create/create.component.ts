import { PositionService } from './../position.service';
import { PositionModels } from './../position-models';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl,FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class PositionCreateComponent implements OnInit {
  positionForm:FormGroup;
  constructor(private entity:PositionModels, private router:Router, private dataService:PositionService, private fb: FormBuilder, private activatedRoute : ActivatedRoute, private spinner: NgxSpinnerService) { 
    this.positionForm  = this.fb.group({      
      positionName: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]))
    })
  }

  save(){
    this.spinner.show();
    setTimeout(()=>{
      debugger;
      this.entity.PositionName = this.positionForm.value.positionName;
      
      this.dataService.createRow(this.entity).subscribe(
        data=>{
          this.spinner.hide();
          this.router.navigate(['home/position/list']); 
        },
        err=>{
          console.log(err);
          this.spinner.hide();
        }
      );
    },1000);  
  }

  ngOnInit() {
  }

}
