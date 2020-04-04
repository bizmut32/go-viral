import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { animation } from 'src/app/components/animations';
import { Subscription } from 'rxjs';
import { RegistrationService } from 'src/app/services/registration.service';
import { LoginData } from 'src/app/model/registration.model';
import { AccountService } from 'src/app/services/account.service';
import { ServerService } from 'src/app/services/server.service';
import { User } from 'src/app/model/api.model';

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
  constructor(private link: ActivatedRoute, private registration: RegistrationService, 
    public account: AccountService, private server: ServerService) {}

  ngOnInit() {
    this.setRegistrationType(this.link.snapshot.parent.params);
  }

  setRegistrationType(params) {
    this.help = params.help === 'help';
  }

  async login() {
    this.account.account = {
      email: this.loginData.email,
      password: this.loginData.password,
    };
    const token = this.server.authEncode(this.account.account.email, this.account.account.password);
    const ret = await this.server.getUserMe(token);
    this.next(ret);
  }

  registrate() {
    this.registration.registrationData.login = this.loginData;
    this.registration.registrate.next();
  }

  next(user: User) {
    this.registration.registrationData.login = this.loginData;
    this.registration.registrationData.personal = {
      ...user, birthDate: new Date(user.birthday)
    };
    this.registration.next.next();
  }

  prev() {
    this.registration.prev.next();
  }
}
