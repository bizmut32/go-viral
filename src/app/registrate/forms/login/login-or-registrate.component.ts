import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { animation } from 'src/app/components/animations';
import { Subscription } from 'rxjs';
import { RegistrationService } from 'src/app/services/registration.service';
import { LoginData } from 'src/app/model/registration.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login-or-registrate',
  templateUrl: './login-or-registrate.component.html',
  styleUrls: ['./login-or-registrate.component.css']
})
export class LoginOrRegistrateComponent implements OnInit {
  help: boolean;

  loginData: LoginData = {
    email: '',
    password: ''
  };

  @ViewChild('form') form;
  constructor(private link: ActivatedRoute, private registration: RegistrationService, private account: AccountService) {}

  ngOnInit() {
    this.setRegistrationType(this.link.snapshot.parent.params);
  }

  setRegistrationType(params) {
    this.help = params.help === 'help';
  }

  login() {
    this.account.account = {
      name: 'Balassa Ádám',
      email: 'kjbwrfiebw',
      phone: 'uwqhlfew',
      password: 'password'
    };
    this.next();
  }

  registrate() {
    this.registration.registrationData.login = this.loginData;
    this.registration.registrate.next();
  }

  next() {
    this.registration.registrationData.login = this.loginData;
    this.registration.registrationData.personal = {
      ...this.loginData, phone: '+36 30 680 3465', name: 'Balassa Ádám'
    };
    this.registration.next.next();
  }

  prev() {
    this.registration.prev.next();
  }
}
