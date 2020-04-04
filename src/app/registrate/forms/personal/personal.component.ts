import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { animation } from 'src/app/components/animations';
import { Subscription } from 'rxjs';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  help: boolean;

  name: string;
  email: string;
  password: string;
  phone: string;

  @ViewChild('form') form;
  constructor(private link: ActivatedRoute, private registration: RegistrationService) {}

  ngOnInit() {
    this.setRegistrationType(this.link.snapshot.parent.params);
  }

  setRegistrationType(params) {
    this.help = params.help === 'help';
  }

  next() {
    this.registration.registrationData.personal = {
      name: this.name, email: this.email, password: this.password, phone: this.phone
    };

    this.registration.next.next();
  }

  prev() {
    this.registration.prev.next();
  }
}
