import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, CanActivate, Router } from '@angular/router';
import { MainComponent } from './main/main.component';
import { IndexComponent } from './main/index/index.component';
import { RegistrateComponent } from './registrate/registrate.component';
import { ShoppingComponent } from './registrate/forms/shopping/shopping.component';
import { PersonalComponent } from './registrate/forms/personal/personal.component';
import { BioComponent } from './registrate/forms/bio/bio.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { CheckComponent } from './registrate/forms/check/check.component';
import { HelpComponent } from './main/help/help.component';
import { LoginOrRegistrateComponent } from './registrate/forms/login/login-or-registrate.component';
import { MyAccountComponent } from './main/my-account/my-account.component';
import { ShoppingHelpComponent } from './main/my-account/shopping-help/shopping-help.component';
import { UserDetailsComponent } from './main/my-account/user-details/user-details.component';
import { MyContactsComponent } from './main/my-account/my-contacts/my-contacts.component';
import { NotificationsComponent } from './main/my-account/notifications/notifications.component';
import { AccountService } from './services/account.service';

@Injectable({
  providedIn: 'root'
})
export class CanMyAccountActivate implements CanActivate {
  constructor(private account: AccountService, private router: Router) {

  }
  canActivate(): Promise<boolean> | boolean {
    if (!this.account.loggedIn)
      this.router.navigateByUrl('/');
    return !!this.account.loggedIn;
  }
}

const routes: Routes = [
  { path: 'registrate/:help/:category', component: RegistrateComponent, children: [
    { path: 'check', component: CheckComponent },
    { path: 'shopping', component: ShoppingComponent },
    { path: 'personal', component: PersonalComponent },
    { path: 'bio', component: BioComponent }
  ]},
  { path: '', component: MainComponent, pathMatch: 'prefix', children: [
    { path: 'my-account', component: MyAccountComponent, canActivate: [CanMyAccountActivate], children: [
      { path: 'shopping-help', component: ShoppingHelpComponent },
      { path: 'shopping-help/user/:userid', component: UserDetailsComponent },
      { path: 'contacts', component: MyContactsComponent },
      { path: 'notifications', component: NotificationsComponent },
    ]},
    { path: '', component: IndexComponent },
    { path: ':help/:category', component: HelpComponent, children: [
      { path: 'check', component: CheckComponent },
      { path: 'shopping', component: ShoppingComponent },
      { path: 'personal', component: PersonalComponent },
      { path: 'bio', component: BioComponent },
      { path: 'login', component: LoginOrRegistrateComponent }
    ]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
