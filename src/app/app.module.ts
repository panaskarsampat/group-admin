import { WorkEditComponent } from './work/edit/edit.component';
import { PositionModels } from './position/position-models';
import { PositionListComponent } from './position/list/list.component';
import { PositionEditComponent } from './position/edit/edit.component';
import { JobsModels } from './jobs/jobs-models';
import { JobsListComponent } from './jobs/list/list.component';
import { JobsEditComponent } from './jobs/edit/edit.component';
import { JobsCreateComponent } from './jobs/create/create.component';
import { Type } from './type/type.model';
import { CityModels } from './city/city-models';
import { StateModels } from './state/state-models';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

// service components
import { UserDataService } from './user-data.service';
import { UserService } from './user/user.service';
import { LoginService } from './login/login.service';

// models components
import { UserModels } from './user/user-models';

// angular support libraries
import { NgxSpinnerModule } from 'ngx-spinner';

// application components
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './home/header/header.component';
import { HeaderRightComponent } from './home/header/header-right/header-right.component';
import { HeaderLeftComponent } from './home/header/header-left/header-left.component';
import { LeftNavigationsComponent } from './home/left-navigations/left-navigations.component';
import { ChildComponentsComponent } from './home/child-components/child-components.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { UserEditComponent } from './user/edit/edit.component';
import { UserCreateComponent } from './user/create/create.component';
import { UserListComponent } from './user/user-list/user-list.component';
// country 
import { CountryComponent } from './country/country.component';
import { CountryListComponent } from './country/list/list.component';
import { CountryEditComponent } from './country/edit/edit.component';
import { CountryCreateComponent } from './country/create/create.component';
// satet
import { StateComponent } from './state/state.component';
import { StateListComponent } from './state/list/list.component';
import { StateCreateComponent } from './state/create/create.component';
import { StateEditComponent } from './state/edit/edit.component';

import { CityComponent } from './city/city.component';
import { CityListComponent } from './city/list/list.component';
import { CityEditComponent } from './city/edit/edit.component';
import { CityCreateComponent } from './city/create/create.component';

import { CategoryComponent } from './category/category.component';
import { CategoryCreateComponent } from './category/create/create.component';
import { CategoryEditComponent } from './category/edit/edit.component';
import { CategoryListComponent } from './category/list/list.component';

import { TypeComponent } from './type/type.component';
import {  TypeListComponent } from './type/list/list.component';
import { TypeEditComponent } from './type/edit/edit.component';
import { TypeCreateComponent } from './type/create/create.component';

import { CompanyComponent } from './company/company.component';
import { CompanyCreateComponent } from './company/create/create.component';
import { CompanyListComponent } from './company/list/list.component';
import { CompanyEditComponent } from './company/edit/edit.component';

import { JobsComponent } from './jobs/jobs.component';
import { PositionComponent } from './position/position.component';
import { WorkComponent } from './work/work.component';
import { UpperCaseDirective } from './common-directives/upper-case.directive';
import { CountryModels } from './country/country-models';
import { Category } from './category/category';
import { CompanyModels } from './company/company-models';
import { PositionCreateComponent } from './position/create/create.component';
import { WorkCreateComponent } from './work/create/create.component';
import { WorkListComponent } from './work/list/list.component';
import { WorkModels } from './work/work-models';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    HomeComponent,
    PageNotFoundComponent,
    HeaderComponent,
    HeaderRightComponent,
    HeaderLeftComponent,
    LeftNavigationsComponent,
    ChildComponentsComponent,
    DashboardComponent,
    UserEditComponent, UserCreateComponent, UserListComponent,
    CountryComponent, CountryListComponent, CountryEditComponent, CountryCreateComponent,
    StateComponent, StateListComponent, StateEditComponent, StateCreateComponent,
    CityComponent, CityCreateComponent, CityEditComponent, CityListComponent,
    CategoryComponent, CategoryCreateComponent, CategoryEditComponent, CategoryListComponent,
    CompanyComponent, CompanyCreateComponent, CompanyEditComponent, CompanyListComponent,
    JobsComponent, JobsCreateComponent, JobsEditComponent, JobsListComponent,
    TypeComponent, TypeCreateComponent, TypeEditComponent, TypeListComponent,
    PositionComponent, PositionCreateComponent, PositionEditComponent, PositionListComponent,
    WorkComponent, WorkCreateComponent, WorkEditComponent, WorkListComponent,
    UpperCaseDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [],
  providers: [
    UserDataService, UserService, LoginService,
    UserModels, CountryModels, StateModels, CityModels, Category, Type, CompanyModels, JobsModels, PositionModels, WorkModels
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
