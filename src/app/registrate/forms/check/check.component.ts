import { Component, OnInit } from '@angular/core';
import { RegistrationData, PersonalData, UserData, BioData, ShoppingData } from 'src/app/model/registration.model';
import { RegistrationService } from 'src/app/services/registration.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { ServerService } from 'src/app/services/server.service';
import { User, Need, Offer } from 'src/app/model/api.model';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {
  help: boolean;
  result: RegistrationData;
  loading = false;
  constructor(private link: ActivatedRoute,
    private registration: RegistrationService,
    public account: AccountService,
    private router: Router,
    private noti: NotifierService,
    private server: ServerService) {}

  ngOnInit() {
    this.setRegistrationType(this.link.snapshot.parent.params);
    this.result = this.registration.registrationData;
  }

  setRegistrationType(params) {
    this.help = params.help === 'help';
  }

  async next() {
    this.loading = true;
    try {
      if (!this.account.loggedIn || this.account.account.email !== this.registration.registrationData.login.email)
        this.registrate();
      else {
        const userId = await this.account.getUserId();
        this.uploadOffer(userId);
      }
    } catch(err) {
      this.loading = false;
      this.noti.notify('error', 'Hiba történt');
    }
  }

  prev() {
    this.registration.prev.next();
  }

  upload(userId: string) {
    if (this.help) this.uploadOffer(userId);
    else this.uploadNeed(userId);
  }

  displayShoppingFrequency(n: any): string {
    n = parseInt(n);
    switch (n) {
      case 0: return 'egyszer';
      case 1: return 'naponta';
      case 2: return '2 naponta';
      case 3: return 'hetente kétszer';
      case 7: return 'hetente';
      case 14: return 'ritkábban, mint hetente';
    }
  }
  async uploadOffer (userId: string) {
    const shopping: ShoppingData = this.registration.registrationData.shopping;
    const offer: Offer = {
      user_id: userId,
      type: 'shopping',
      location: {
        zip: shopping.zip,
        city: shopping.city
      },
      paymentMethod: shopping.payment.transfer ? 'transfer' : '' +
        shopping.payment.transfer && shopping.payment.cash ? ',' : '' +
        shopping.payment.cash ? 'cash' : '',
      description: shopping.description || '-',
      level: null,
      flatSpec: null,
      hasCar: true,
      experience: '',
      skills: []
    };
    try {
      await this.server.postOffer(offer);
    }
    catch (err) {}
    finally {
      this.loading = false;
      this.router.navigateByUrl('/my-account');
    }
  }

  async uploadNeed (userId: string) {
    const shopping: ShoppingData = this.registration.registrationData.shopping;
    const need: Need = {
      user_id: userId,
      type: 'shopping',
      frequency: shopping.frequency,
      location: {
        zip: shopping.zip,
        city: shopping.city
      },
      paymentMethod: shopping.payment.transfer ? 'transfer' : '' +
        shopping.payment.transfer && shopping.payment.cash ? ',' : '' +
        shopping.payment.cash ? 'cash' : '',
      duration: 1,
      description: shopping.description,
      level: null,
      subjects: null,
      flatSpec: null
    };
    try {
      await this.server.postNeed(need);
    }
    catch (err) {}
    finally {
      this.loading = false;
      this.router.navigateByUrl('/my-account');
    }
  }

  async registrate() {
    const person: UserData = this.registration.registrationData.personal;
    const user: User = {
      name: person.name,
      email: person.email,
      phone: person.phone,
      password: person.password,
      viewers: [],
      pending: [],
      birthday: '1998-12-31',
      sex: 'male',
      videourl: ''
    };
    this.account.account = {
      email: person.email,
      password: person.password
    };
    try {
      const userId = await this.server.postUser(user);
      this.upload(userId._id);
    }
    catch (err) {
    }
  }

}
