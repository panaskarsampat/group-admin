import { TypeService } from './../type.service';
import { Type } from './../type.model';

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
export class TypeCreateComponent implements OnInit {

  typeForm:FormGroup;
  constructor(private typeEntity:Type, private router:Router, private dataService:TypeService, private fb: FormBuilder, private activatedRoute : ActivatedRoute, private spinner: NgxSpinnerService) { 
    this.typeForm  = this.fb.group({      
      companytype: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(256)
      ]))
    })
  }

  saveType(){
    this.spinner.show();
    setTimeout(()=>{
      debugger;
      this.typeEntity.CompanyType = this.typeForm.value.companytype;
      
      this.dataService.createRow(this.typeEntity).subscribe(
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

  ngOnInit() {
  }

}
