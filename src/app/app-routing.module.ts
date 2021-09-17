import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TestComponent} from "./components/test/test.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {UsersListComponent} from "./components/users-list/users-list.component";
import {ActivitesListComponent} from "./components/activites-list/activites-list.component";
import {UserDetailComponent} from "./components/users-list/user-detail/user-detail.component";
import {UserAddComponent} from "./components/users-list/user-add/user-add.component";
import {CollaborateurTempsComponent} from "./components/users-list/collaborateur-temps/collaborateur-temps.component";
import {ActiviterDetailComponent} from "./components/activites-list/activiter-detail/activiter-detail.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./services/auth-guard.service";
import {AfterAuthGuard} from "./services/after-auth.guard";
import {HomeCollaborateurComponent} from "./components/home-collaborateur/home-collaborateur.component";
import {AccessDeniedComponent} from "./components/access-denied/access-denied.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {HomeComponent} from "./components/home/home.component";
import {TypesPauseListComponent} from "./components/types-pause-list/types-pause-list.component";
import {SettingsAdminComponent} from "./components/settings-admin/settings-admin.component";

const routes: Routes = [
  {path : "" , component : HomeComponent},
  {path : "home", canActivate: [AuthGuard] , component : DashboardComponent,
    data: {roles: ['admin', 'superviseur']}},
  {path : "login/:msgErr" , component : LoginComponent, canActivate : [AfterAuthGuard]},
  {path : "login" , component : LoginComponent, canActivate : [AfterAuthGuard]},
  {path : "users", canActivate: [AuthGuard], component : UsersListComponent,
    data: {roles: ['admin', 'superviseur']} },
  {path : "activites", canActivate: [AuthGuard] , component : ActivitesListComponent,
    data: {roles: ['admin']} },
  {path : "types", canActivate: [AuthGuard] , component : TypesPauseListComponent,
    data: {roles: ['admin']} },
  {path : "user/:userId", canActivate: [AuthGuard] , component : UserDetailComponent,
    data: {roles: ['admin', 'superviseur', 'collaborateur']} },
  {path : "activiter/:id", canActivate: [AuthGuard] , component : ActiviterDetailComponent,
    data: {roles: ['admin']} },
  {path : "collaborateurTemps/:userId", canActivate: [AuthGuard] , component : CollaborateurTempsComponent,
    data: {roles: ['admin', 'superviseur']} },
  {path : "addUser", canActivate: [AuthGuard] , component : UserAddComponent,
    data: {roles: ['admin', 'superviseur']} },
  {path : "settings", canActivate: [AuthGuard] , component : SettingsComponent,
    data: {roles: ['superviseur']} },
  {path : "settings/admin", canActivate: [AuthGuard] , component : SettingsAdminComponent,
    data: {roles: ['admin']} },
  {path : "home/collaborateur", canActivate: [AuthGuard] , component : HomeCollaborateurComponent,
    data: {roles: ['collaborateur']} },
  {path : "403" , component : AccessDeniedComponent, },
  {path : "404", canActivate: [AuthGuard] , component : NotFoundComponent,
    data: {roles: ['admin', 'superviseur', 'collaborateur']} },
  {path : "test" , component : TestComponent },
  {path : "**", redirectTo: '/404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
