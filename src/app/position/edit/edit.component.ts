import { PositionModels } from './../position-models';
import { PositionService } from '../position.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl,FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class PositionEditComponent implements OnInit {
  positionForm:FormGroup;
  entity:PositionModels;

  constructor(private router:Router, private dataService:PositionService, private fb: FormBuilder, private activatedRoute : ActivatedRoute, private spinner: NgxSpinnerService) { 
    this.positionForm  = this.fb.group({      
      positionName: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]))     
    })
  }

  loadById(id){
    this.spinner.show();
    setTimeout(()=>{
      this.dataService.getById(id).subscribe(
        data=>{
          this.entity=data;
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

  setValues(){
    this.positionForm.setValue({
      positionName:this.entity.PositionName
    });
  }

  update(){
    this.spinner.show();
    setTimeout(()=>{
      this.entity.PositionName = this.positionForm.value.positionName;
      
      this.dataService.updateRow(this.entity).subscribe(
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

  delete(){
    if(confirm('are you sure to delete?')){
      this.spinner.show();
      setTimeout(()=>{
        this.dataService.deleteById(this.entity.PositionId).subscribe(
          data=>{
            this.spinner.hide();
            this.router.navigate(['home/position/list']); 
          },err=>{
            this.spinner.hide();
          }
        );
      },1000);
    }
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      let id = params['id'];            
      this.loadById(id);              
    });
  }

}
