import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { TestComponent } from './components/test/test.component';
import { MenuComponent } from './components/menu/menu.component';
import { TopBarComponent } from './components/menu/top-bar/top-bar.component';
import { FooterComponent } from './components/menu/footer/footer.component';
import { SideBarComponent } from './components/menu/side-bar/side-bar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { ActivitesListComponent } from './components/activites-list/activites-list.component';
import {FormsModule} from "@angular/forms";
import { UserDetailComponent } from './components/users-list/user-detail/user-detail.component';
import { UserAddComponent } from './components/users-list/user-add/user-add.component';
import { CollaborateurTempsComponent } from './components/users-list/collaborateur-temps/collaborateur-temps.component';
import { ActiviterDetailComponent } from './components/activites-list/activiter-detail/activiter-detail.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LoginComponent } from './components/login/login.component';
import { HomeCollaborateurComponent } from './components/home-collaborateur/home-collaborateur.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { ChartsModule } from 'ng2-charts';
import { TypesPauseListComponent } from './components/types-pause-list/types-pause-list.component';
import { SettingsAdminComponent } from './components/settings-admin/settings-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    MenuComponent,
    TopBarComponent,
    FooterComponent,
    SideBarComponent,
    DashboardComponent,
    UsersListComponent,
    ActivitesListComponent,
    UserDetailComponent,
    UserAddComponent,
    CollaborateurTempsComponent,
    ActiviterDetailComponent,
    SettingsComponent,
    LoginComponent,
    HomeCollaborateurComponent,
    AccessDeniedComponent,
    NotFoundComponent,
    HomeComponent,
    TypesPauseListComponent,
    SettingsAdminComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ChartsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
