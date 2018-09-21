import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl,FormBuilder, Validators, FormGroup } from '@angular/forms';

import { TypeService } from './../type.service';
import { Type } from './../type.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class TypeEditComponent implements OnInit {
  typeForm:FormGroup;
  typeEntity:Type;

  constructor(private router:Router, private dataService:TypeService, private fb: FormBuilder, private activatedRoute : ActivatedRoute, private spinner: NgxSpinnerService) {
    this.typeForm  = this.fb.group({      
      companytype: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(250)
      ]))     
    })
  }

  loadTypeById(id){
    this.spinner.show();
    setTimeout(()=>{
      this.dataService.getById(id).subscribe(
        data=>{
          this.typeEntity = data;
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
    this.typeForm.setValue({
      companytype:this.typeEntity.CompanyType
    });
  }

  updateType(){
    this.spinner.show();
    setTimeout(()=>{
      this.typeEntity.CompanyType = this.typeForm.value.companytype;
      
      this.dataService.updateRow(this.typeEntity).subscribe(
        data=>{
          this.spinner.hide();
          this.router.navigate(['home/type/list']); 
        },
        err=>{
          console.log(err);
          this.spinner.hide();
        }
      );
    },1000);
  }

  deleteType(){
    if(confirm('are you sure to delete?')){
      this.spinner.show();
      setTimeout(()=>{
        this.dataService.deleteById(this.typeEntity.CompanyTypeId).subscribe(
          data=>{
            this.spinner.hide();
            this.router.navigate(['home/type/list']); 
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
      
      this.loadTypeById(id);   
    });
  }
}
