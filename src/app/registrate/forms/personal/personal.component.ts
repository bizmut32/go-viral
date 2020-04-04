import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { animation } from 'src/app/components/animations';
import { Subscription } from 'rxjs';
import { RegistrationService } from 'src/app/services/registration.service';
import { PersonalData } from 'src/app/model/registration.model';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  help: boolean;

  personalData: PersonalData = {
    email: '',
    password: '',
  };

  @ViewChild('form') form;
  constructor(private link: ActivatedRoute, private registration: RegistrationService) {}

  ngOnInit() {
    this.setRegistrationType(this.link.snapshot.parent.params);
    console.log(this.registration.registrationData);

    if (this.registration.registrationData.personal) {
      this.personalData.email = this.registration.registrationData.personal.email;
      this.personalData.password = this.registration.registrationData.personal.password;
    }
    else if (this.registration.registrationData.login) {
      this.personalData.email = this.registration.registrationData.login.email;
      this.personalData.password = this.registration.registrationData.login.password;
    }
  }

  setRegistrationType(params) {
    this.help = params.help === 'help';
  }

  next() {
    this.registration.registrationData.personal = {
      ...this.personalData
    };

    this.registration.next.next();
  }

  prev() {
    this.registration.prev.next();
  }
}
