import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { CategoryService } from './../category.service';
import { Category } from './../category';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class CategoryListComponent implements OnInit {
  categoryForm:FormGroup;
  isUpdating:boolean;
  categoryList:Category[];
  constructor(private spinner: NgxSpinnerService, private fb: FormBuilder, private categoryDataService : CategoryService) {
    this.categoryForm  = this.fb.group({
      searchtext: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(250)
      ]))
    })
   }

   canDeactivate(): Observable<boolean> | boolean {    
    if (this.categoryForm.dirty) {      
      return confirm('Discard changes for Country?');
    }
    return true;
  }

  loadLists(){
    this.spinner.show();
    setTimeout(()=>{
      this.categoryDataService.getAll().subscribe(        
        data=>{
          debugger;
          this.categoryList=data;
          this.spinner.hide();
        },
        err=>{
          console.log(err);
          this.spinner.hide();
        }
      );
    },1000);
  }

  searchText(){
    this.spinner.show();
    setTimeout(()=>{            
      this.categoryList =this.categoryList.filter(u=>u.CompanyCategory.toLowerCase().indexOf(this.categoryForm.value.searchtext.toLowerCase())>=0);
      this.spinner.hide();  
    });
  }

  loadList(){
    this.loadLists();
    this.categoryForm.reset();
  }
  
  ngOnInit() {
    this.loadList();
  }

}
