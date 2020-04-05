import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { IndexComponent } from './main/index/index.component';
import { HeaderComponent } from './main/header/header.component';
import { LoginComponent } from './main/login/login.component';
import { RegistrateComponent } from './registrate/registrate.component';
import { ShoppingComponent } from './registrate/forms/shopping/shopping.component';
import { AutocompleteSelectorComponent } from './components/autocomplete-selector/autocomplete-selector.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { FormAlertComponent } from './components/form-alert/form-alert.component';
import { PersonalComponent } from './registrate/forms/personal/personal.component';
import { BioComponent } from './registrate/forms/bio/bio.component';
import { TimePipe } from './pipes/time.pipe';
import { CheckComponent } from './registrate/forms/check/check.component';
import { HelpComponent } from './main/help/help.component';
import { LoginOrRegistrateComponent } from './registrate/forms/login/login-or-registrate.component';
import { MyAccountComponent } from './main/my-account/my-account.component';
import { ShoppingHelpComponent } from './main/my-account/shopping-help/shopping-help.component';
import { HttpClientModule } from '@angular/common/http';
import { UserDetailsComponent } from './main/my-account/user-details/user-details.component';
import { MyContactsComponent } from './main/my-account/my-contacts/my-contacts.component';
import { NotificationsComponent } from './main/my-account/notifications/notifications.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NotifierModule } from 'angular-notifier';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    IndexComponent,
    HeaderComponent,
    LoginComponent,
    RegistrateComponent,
    ShoppingComponent,
    AutocompleteSelectorComponent,
    CheckboxComponent,
    FormAlertComponent,
    PersonalComponent,
    BioComponent,
    TimePipe,
    CheckComponent,
    HelpComponent,
    LoginOrRegistrateComponent,
    MyAccountComponent,
    ShoppingHelpComponent,
    UserDetailsComponent,
    MyContactsComponent,
    LoadingComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NotifierModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
