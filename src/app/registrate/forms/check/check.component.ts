import { Component, OnInit } from '@angular/core';
import { RegistrationData } from 'src/app/model/registration.model';
import { RegistrationService } from 'src/app/services/registration.service';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {

  help: boolean;
  result: RegistrationData;
  constructor(private link: ActivatedRoute, private registration: RegistrationService, private account: AccountService) {}

  ngOnInit() {
    this.setRegistrationType(this.link.snapshot.parent.params);
    this.result = this.registration.registrationData;
  }

  setRegistrationType(params) {
    this.help = params.help === 'help';
  }

  next() {
    if (!this.account.loggedIn)
      this.account.account = {
        name: 'Balassa Ádám',
        email: 'kjbwrfiebw',
        phone: 'uwqhlfew',
        password: 'password'
      };
    else {
      alert('Thanl you for your help');
    }
  }

  prev() {
    this.registration.prev.next();
  }

  displayShoppingFrequency(n: number): string {
    switch (n){
      case 0: return 'Egyszer';
      case 1: return 'Naponta';
      case 2: return '2 naponta';
      case 3: return 'Hetente kétszer';
      case 7: return 'Hetente';
      case 14: return 'Ritkábban, mint hetente';
    }
  }

}
