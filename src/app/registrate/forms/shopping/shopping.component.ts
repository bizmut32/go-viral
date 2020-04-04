import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { animation } from 'src/app/components/animations';
import { Subscription } from 'rxjs';
import { RegistrationService } from 'src/app/services/registration.service';
import { ShoppingData } from 'src/app/model/registration.model';
import { ServerService } from 'src/app/services/server.service';

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
  constructor(private link: ActivatedRoute, private registration: RegistrationService, private server: ServerService) {}

  ngOnInit() {
    this.setRegistrationType(this.link.snapshot.parent.params);
    if (this.registration.registrationData.shopping) {
      this.shoppingData = { ...this.registration.registrationData.shopping };
    }
  }

  setRegistrationType(params) {
    this.help = params.help === 'help';
  }

  async zipChanged() {
    if (this.shoppingData.zip.length === 4) {
      this.shoppingData.city = "..."
      var town = await this.server.getTownsByZipcode(this.shoppingData.zip)
      if(town.items[0].town_name == "Budapest") {
        var dist_num = Math.floor(town.items[0].zipcode / 10) % 100
        var romans = [null,"I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV","XVI","XVII","XVIII","XIV","XX","XXI","XXII","XXIII","XXIV"]
        town.items[0].town_name += ` ${romans[dist_num]}.`
      }
      this.shoppingData.city = town.items[0].town_name;
    }
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
