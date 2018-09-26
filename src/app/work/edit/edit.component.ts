import { WorkModels } from './../work-models';
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { CountryModels } from "../../country/country-models";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { WorkService } from "../work.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-work-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"]
})
export class WorkEditComponent implements OnInit {
  workForm: FormGroup;
  editWork: WorkModels;
  constructor(private router: Router,private workService: WorkService,private fb: FormBuilder,private activatedRoute: ActivatedRoute,private spinner: NgxSpinnerService) {
    this.workForm  = this.fb.group({      
      workname: new FormControl('',Validators.compose([
        Validators.required,           
        Validators.minLength(3),
        Validators.maxLength(256)    
      ])),   
     
    });
  }
  loadWorkById(id){
    this.spinner.show();
    setTimeout(()=>{
      this.workService.getWorkById(id).subscribe(
        data=>{
          this.editWork=data;
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
    this.workForm.setValue({
      workname:this.editWork.WorkName     
    });
  }

  updateWork(){
    this.spinner.show();
    setTimeout(()=>{
      this.editWork.WorkName = this.workForm.value.workname;
     
      this.workService.updateWork(this.editWork).subscribe(
        data=>{
          this.spinner.hide();
          this.router.navigate(['home/work/list']); 
        },
        err=>{
          console.log(err);
          this.spinner.hide();
        }
      );
    },1000);
  }
  deleteWork(){
    if(confirm('are you sure to delete?')){
      this.spinner.show();
      setTimeout(()=>{
        this.workService.deleteWorkById(this.editWork.WorkId).subscribe(
          data=>{
            this.spinner.hide();
            this.router.navigate(['home/work/list']); 
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
      
      this.loadWorkById(id);              
    });
  }
}
