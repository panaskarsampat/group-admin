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
        
        {path:'dashboard',component:DashboardComponent, canDeactivate:[AuthGaurdService]},
        {path:'', redirectTo:'user', pathMatch: 'full'},
        {path:'**', component:PageNotFoundComponent, pathMatch: 'full'}
    ]},
    {path:'', redirectTo:'login', pathMatch: 'full'},
    {path:'**', component:PageNotFoundComponent, pathMatch: 'full'}
];