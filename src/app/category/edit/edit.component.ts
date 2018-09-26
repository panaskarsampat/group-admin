import { CategoryService } from './../category.service';
import { Category } from './../category';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl,FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  categoryForm:FormGroup;
  categoryEntity:Category;

  constructor(private router:Router, private categoryDataService:CategoryService, private fb: FormBuilder, private activatedRoute : ActivatedRoute, private spinner: NgxSpinnerService) {

    this.categoryForm  = this.fb.group({
      
      companycategory: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(250)
      ]))
     
    })
   }
   
   loadCategoryById(id){
    this.spinner.show();
    setTimeout(()=>{
      this.categoryDataService.getById(id).subscribe(
        data=>{
          this.categoryEntity = data;
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
    this.categoryForm.setValue({
      companycategory:this.categoryEntity.CompanyCategory
    });
  }


  updateCategory(){
    this.spinner.show();
    setTimeout(()=>{
      this.categoryEntity.CompanyCategory = this.categoryForm.value.companycategory;
      
      this.categoryDataService.updateRow(this.categoryEntity).subscribe(
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

  deleteCategory(){
    if(confirm('are you sure to delete?')){
      this.spinner.show();
      setTimeout(()=>{
        this.categoryDataService.deleteById(this.categoryEntity.CompanyCategoryId).subscribe(
          data=>{
            this.spinner.hide();
            this.router.navigate(['home/category/list']); 
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
      
      this.loadCategoryById(id);   
    });
  }

}
