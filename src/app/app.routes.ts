import { WorkEditComponent } from './work/edit/edit.component';
import { WorkComponent } from './work/work.component';
import { CityListComponent } from './city/list/list.component';
import { CityEditComponent } from './city/edit/edit.component';
import { CityCreateComponent } from './city/create/create.component';
import { CityComponent } from './city/city.component';
import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGaurdService } from './auth-gaurd.service';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { UserEditComponent } from './user/edit/edit.component';
import { UserCreateComponent } from './user/create/create.component';
import { UserListComponent } from './user/user-list/user-list.component';

import { CountryComponent } from './country/country.component';
import { CountryCreateComponent } from './country/create/create.component';
import { CountryEditComponent } from './country/edit/edit.component';
import { CountryListComponent } from './country/list/list.component';

import { StateComponent } from './state/state.component';
import { StateListComponent } from './state/list/list.component';
import { StateEditComponent } from './state/edit/edit.component';
import { StateCreateComponent } from './state/create/create.component';

import { CategoryComponent } from './category/category.component';
import { CategoryListComponent } from './category/list/list.component';
import { CategoryEditComponent } from './category/edit/edit.component';
import { CategoryCreateComponent } from './category/create/create.component';

import { TypeComponent } from './type/type.component';
import { TypeCreateComponent } from './type/create/create.component';
import { TypeListComponent } from './type/list/list.component';
import { TypeEditComponent } from './type/edit/edit.component';

import { CompanyComponent } from './company/company.component';
import { CompanyCreateComponent } from './company/create/create.component';
import { CompanyEditComponent } from './company/edit/edit.component';
import { CompanyListComponent } from './company/list/list.component';

import { PositionComponent } from './position/position.component';
import { PositionListComponent } from './position/list/list.component';
import { PositionCreateComponent } from './position/create/create.component';
import { PositionEditComponent } from './position/edit/edit.component';

import { JobsListComponent } from './jobs/list/list.component';
import { JobsEditComponent } from './jobs/edit/edit.component';
import { JobsCreateComponent } from './jobs/create/create.component';
import { JobsComponent } from './jobs/jobs.component';
import { WorkCreateComponent } from './work/create/create.component';
import { WorkListComponent } from './work/list/list.component';

export const appRoutes:Routes=[    
    {path:'login',component:LoginComponent},
    {path:'home',component:HomeComponent, canActivate:[AuthGaurdService], children:[
        {path:'user',component:UserComponent, canDeactivate:[AuthGaurdService], canActivateChild:[AuthGaurdService], children:[
            {path:'create',component:UserCreateComponent},
            {path:'edit/:id',component:UserEditComponent},
            {path:'list',component:UserListComponent},
        ]},
        {path:'country',component:CountryComponent, canDeactivate:[AuthGaurdService], canActivateChild:[AuthGaurdService], children:[
            {path:'create',component:CountryCreateComponent},
            {path:'edit/:id',component:CountryEditComponent},
            {path:'list',component:CountryListComponent},
        ]},
        {path:'state',component:StateComponent, canDeactivate:[AuthGaurdService], canActivateChild:[AuthGaurdService], children:[
            {path:'create',component:StateCreateComponent},
            {path:'edit/:id',component:StateEditComponent},
            {path:'list',component:StateListComponent},
        ]},
        {path:'city',component:CityComponent, canDeactivate:[AuthGaurdService], canActivateChild:[AuthGaurdService],
         children:[
            {path:'create',component:CityCreateComponent},
            {path:'edit/:id',component:CityEditComponent},
            {path:'list',component:CityListComponent},
        ]},
        {path:'category',component:CompanyComponent, canDeactivate:[AuthGaurdService], canActivateChild:[AuthGaurdService],
         children:[
            {path:'create',component:CategoryCreateComponent},
            {path:'edit/:id',component:CategoryEditComponent},
            {path:'list',component:CategoryListComponent},
        ]},
        {path:'type',component:TypeComponent, canDeactivate:[AuthGaurdService], canActivateChild:[AuthGaurdService],
        children:[
           {path:'create',component:TypeCreateComponent},
           {path:'edit/:id',component:TypeEditComponent},
           {path:'list',component:TypeListComponent},
        ]},
        {path:'company',component:CategoryComponent, canDeactivate:[AuthGaurdService], canActivateChild:[AuthGaurdService],
         children:[
            {path:'create',component:CompanyCreateComponent},
            {path:'edit/:id',component:CompanyEditComponent},
            {path:'list',component:CompanyListComponent},
        ]},
        {path:'position',component:PositionComponent, canDeactivate:[AuthGaurdService], canActivateChild:[AuthGaurdService],
        children:[
           {path:'create',component:PositionCreateComponent},
           {path:'edit/:id',component:PositionEditComponent},
           {path:'list',component:PositionListComponent},
        ]}, 
        {path:'jobs',component:JobsComponent, canDeactivate:[AuthGaurdService], canActivateChild:[AuthGaurdService],
         children:[
            {path:'create',component:JobsCreateComponent},
            {path:'edit/:id',component:JobsEditComponent},
            {path:'list',component:JobsListComponent},
        ]},        
        {path:'work',component:WorkComponent, canDeactivate:[AuthGaurdService], canActivateChild:[AuthGaurdService],
        children:[
           {path:'create',component:WorkCreateComponent},
           {path:'edit/:id',component:WorkEditComponent},
           {path:'list',component:WorkListComponent},
        ]},        
        {path:'dashboard',component:DashboardComponent, canDeactivate:[AuthGaurdService]},
        {path:'', redirectTo:'user', pathMatch: 'full'},
        {path:'**', component:PageNotFoundComponent, pathMatch: 'full'}
    ]},
    {path:'', redirectTo:'login', pathMatch: 'full'},
    {path:'**', component:PageNotFoundComponent, pathMatch: 'full'}
];