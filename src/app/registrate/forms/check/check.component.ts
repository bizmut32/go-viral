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
  constructor(private link: ActivatedRoute, private registration: RegistrationService, public account: AccountService) {}

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
        email: 'kjbwrfiebw',
        password: 'password'
      };
    else {
      alert('Thank you for your help');
      console.log(this.account)
    }
  }

  prev() {
    this.registration.prev.next();
  }

  displayShoppingFrequency(n: number): string {
    switch (n){
      case 0: return 'egyszer';
      case 1: return 'naponta';
      case 2: return '2 naponta';
      case 3: return 'hetente kétszer';
      case 7: return 'hetente';
      case 14: return 'ritkábban, mint hetente';
    }
  }

}
