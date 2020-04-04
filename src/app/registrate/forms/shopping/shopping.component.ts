import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { animation } from 'src/app/components/animations';
import { Subscription } from 'rxjs';
import { RegistrationService } from 'src/app/services/registration.service';
import { ShoppingData } from 'src/app/model/registration.model';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css'],
  animations: [ animation() ]
})
export class ShoppingComponent implements OnInit {

  help: boolean;


  shoppingData: ShoppingData = {
    zip: '',
    city: '',
    frequency: -1,
    payment: {
      transfer: true,
      cash: true
    },
    description: ''
  };
  description: string;

  @ViewChild('form') form;
  constructor(private link: ActivatedRoute, private registration: RegistrationService) {}

  ngOnInit() {
    this.setRegistrationType(this.link.snapshot.parent.params);
    if (this.registration.registrationData.shopping) {
      this.shoppingData = { ...this.registration.registrationData.shopping };
    }
  }

  setRegistrationType(params) {
    this.help = params.help === 'help';
  }

  zipChanged() {
    if (this.shoppingData.zip.length === 4)
      this.shoppingData.city = 'Budapest';
    else this.shoppingData.city = '';
  }

  next() {
    this.registration.registrationData.shopping = this.shoppingData;
    this.registration.next.next();
  }

  prev() {
    this.registration.prev.next();
  }

}
