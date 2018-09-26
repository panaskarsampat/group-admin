import { CategoryService } from './../category.service';
import { Category } from './../category';
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
export class CategoryCreateComponent implements OnInit {
  categoryForm:FormGroup;
  constructor(private categoryEntity:Category, private router:Router, private categoryDataService:CategoryService, private fb: FormBuilder, private activatedRoute : ActivatedRoute, private spinner: NgxSpinnerService) {
    this.categoryForm  = this.fb.group({      
      companycategory: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(256)
      ]))
    })
   }

   saveCategory(){
    this.spinner.show();
    setTimeout(()=>{
      debugger;
      this.categoryEntity.CompanyCategory = this.categoryForm.value.companycategory;
      
      this.categoryDataService.createRow(this.categoryEntity).subscribe(
        data=>{
          this.spinner.hide();
          this.router.navigate(['home/category/list']); 
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
