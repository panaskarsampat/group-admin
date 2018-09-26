import { Observable } from 'rxjs';
import { PositionService } from './../position.service';
import { PositionModels } from './../position-models';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class PositionListComponent implements OnInit {
  positionForm:FormGroup;
  isUpdating:boolean;
  positionList:PositionModels[];

  constructor(private spinner: NgxSpinnerService, private fb: FormBuilder, private dataService : PositionService) { 
    this.positionForm  = this.fb.group({
      searchtext: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]))
    })
  } 

  canDeactivate(): Observable<boolean> | boolean {    
    if (this.positionForm.dirty) {      
      return confirm('Discard changes for Country?');
    }
    return true;
  }

  loadLists(){
    this.spinner.show();
    setTimeout(()=>{
      this.dataService.getAll().subscribe(
        data=>{
          this.positionList=data;
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
      this.positionList =this.positionList.filter(u=>u.PositionName.toLowerCase().indexOf(this.positionForm.value.searchtext.toLowerCase())>=0);
      this.spinner.hide();  
    });
  }

  loadList(){
    this.loadLists();
    this.positionForm.reset();
  }

  ngOnInit() {
    this.loadLists();
  }

}
