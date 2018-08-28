import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
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
import { CountryComponent } from './country/country.component';
import { CountryListComponent } from './country/list/list.component';
import { CountryEditComponent } from './country/edit/edit.component';
import { CountryCreateComponent } from './country/create/create.component';
import { StateComponent } from './state/state.component';
import { CityComponent } from './city/city.component';
import { CompanyComponent } from './company/company.component';
import { JobsComponent } from './jobs/jobs.component';
import { PositionComponent } from './position/position.component';
import { WorkComponent } from './work/work.component';

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
    UserEditComponent, UserCreateComponent, UserListComponent, CountryComponent, CountryListComponent, CountryEditComponent, CountryCreateComponent, StateComponent, CityComponent, CompanyComponent, JobsComponent, PositionComponent, WorkComponent
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
  providers: [UserDataService, UserModels, UserService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
